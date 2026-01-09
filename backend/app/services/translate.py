import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def translate_to_english(raw_transcript: str, detected_language: str) -> str:
    """
    Translate any language transcript into English.
    """

    if detected_language == "en":
        return raw_transcript

    prompt = f"""
    Translate the following sales call transcript into English.
    Preserve meaning and intent.

    Transcript:
    {raw_transcript}
    """

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a translation assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    return response.choices[0].message["content"].strip()
