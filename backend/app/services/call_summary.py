import os
import json
from openai import OpenAI
from app.services.translate import translate_to_english

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def analyze_call_with_gpt(
    english_transcript: str,
    network_quality_score: float,
    call_duration: int
) -> dict:
    """
    Uses GPT to analyze a sales call transcript and return structured insights.
    """

    prompt = f"""
You are a sales call analysis engine.

Analyze the following English sales call transcript and return STRICT JSON with:

- summary: 2–3 concise lines
- outcome: Interested | Not Interested | Follow-up | Converted
- sentiment: Positive | Neutral | Negative
- followup_required: true or false
- followup_date: YYYY-MM-DD or null
- call_quality_score: number from 0 to 100
- rejection_reason: null or string
- is_time_waste: true or false

Transcript:
\"\"\"{english_transcript}\"\"\"

Network quality score: {network_quality_score}
Call duration (seconds): {call_duration}

IMPORTANT:
- Return ONLY valid JSON
- No explanations
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You analyze sales calls."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    try:
        return json.loads(response.choices[0].message.content.strip())
    except json.JSONDecodeError:
        return {
            "summary": "AI analysis failed",
            "outcome": "N/A",
            "sentiment": "Neutral",
            "followup_required": False,
            "followup_date": None,
            "call_quality_score": 0,
            "rejection_reason": "Invalid AI response",
            "is_time_waste": True
        }


def process_call_audio(
    audio_path: str,
    network_quality_score: float,
    call_duration: int
) -> dict:
    # 1️⃣ Speech-to-text using Whisper (NEW API)
    try:
        with open(audio_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                file=audio_file,
                model="whisper-1",
                response_format="verbose_json"
            )

        raw_transcript = transcription.text.strip()
        detected_language = getattr(transcription, "language", "en")

    except Exception:
        return {
            "raw_transcript": "",
            "english_transcript": "",
            "summary": "",
            "outcome": "",
            "sentiment": "",
            "followup_required": False,
            "followup_date": None,
            "call_quality_score": 0,
            "network_quality_score": network_quality_score,
            "rejection_reason": "Speech recognition failed",
            "is_time_waste": True
        }

    # 2️⃣ Handle empty or silent calls
    if not raw_transcript or len(raw_transcript) < 5:
        return {
            "raw_transcript": raw_transcript,
            "english_transcript": "",
            "summary": "",
            "outcome": "",
            "sentiment": "",
            "followup_required": False,
            "followup_date": None,
            "call_quality_score": 0,
            "network_quality_score": network_quality_score,
            "rejection_reason": "No meaningful conversation",
            "is_time_waste": True
        }

    # 3️⃣ Translate transcript to English
    english_transcript = translate_to_english(raw_transcript, detected_language)

    # 4️⃣ GPT analysis
    analysis = analyze_call_with_gpt(
        english_transcript,
        network_quality_score,
        call_duration
    )

    # 5️⃣ Final structured response
    return {
        "raw_transcript": raw_transcript,
        "english_transcript": english_transcript,
        "summary": analysis.get("summary", ""),
        "outcome": analysis.get("outcome", ""),
        "sentiment": analysis.get("sentiment", ""),
        "followup_required": analysis.get("followup_required", False),
        "followup_date": analysis.get("followup_date"),
        "call_quality_score": analysis.get("call_quality_score", 0),
        "network_quality_score": network_quality_score,
        "rejection_reason": analysis.get("rejection_reason"),
        "is_time_waste": analysis.get("is_time_waste", False)
    }

   
