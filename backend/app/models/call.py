def call_model(data):
    return {
        "lead_id": data.get("lead_id"),
        "user_id": data.get("user_id"),
        "timestamp": data.get("timestamp"),
        "duration": data.get("duration"),
        "sentiment": data.get("sentiment"),
        "summary": data.get("summary"),
        "network_score": data.get("network_score"),
        "call_score": data.get("call_score"),
        "rejected_reason": data.get("rejected_reason")
    }