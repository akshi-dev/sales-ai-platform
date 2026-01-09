def user_model(data):
    return {
        "name": data.get("name"),
        "email": data.get("email"),
        "role": data.get("role", "salesperson"),
        "phone": data.get("phone")
    }