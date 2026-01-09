def lead_model(data):
    return {
        "name": data.get("name"),
        "phone": data.get("phone"),
        "location": data.get("location"),
        "assigned_to": data.get("assigned_to"),
        "status": data.get("status", "new"),
        "score": data.get("score"),
        "follow_up_date": data.get("follow_up_date")
    }