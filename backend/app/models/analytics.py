def analytics_model(data):
    return {
        "salesperson_id": data.get("salesperson_id"),
        "total_calls": data.get("total_calls"),
        "unique_numbers": data.get("unique_numbers"),
        "avg_duration": data.get("avg_duration"),
        "conversion_rate": data.get("conversion_rate"),
        "best_hours": data.get("best_hours")
    }