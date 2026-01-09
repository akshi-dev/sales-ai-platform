from app.db.database import leads_collection, analytics_collection
from app.db.database import users_collection


# ---------- HELPERS ----------

def get_active_lead_count(salesperson_id: str) -> int:
    """
    Number of active (non-closed) leads assigned to salesperson
    """
    return leads_collection.count_documents({
        "assigned_to": salesperson_id,
        "status": {"$ne": "converted"}
    })


def get_conversion_rate(salesperson_id: str) -> float:
    """
    Fetch conversion rate from analytics collection
    Defaults safely if not present
    """
    record = analytics_collection.find_one(
        {"salesperson_id": salesperson_id},
        {"conversion_rate": 1}
    )
    return record.get("conversion_rate", 0.0) if record else 0.0


# ---------- SALESPERSON SCORING ----------

def score_salesperson(sp: dict, lead_score: float) -> float:
    """
    Higher score = better candidate
    """

    load = get_active_lead_count(sp["id"])
    conversion = get_conversion_rate(sp["id"])

    # weights (tunable later)
    return (
        (lead_score * 0.4) +
        (conversion * 0.4) -
        (load * 0.2)
    )


# ---------- MAIN ASSIGNMENT ENGINE ----------

def assign_lead_to_best_salesperson(lead: dict) -> str:
    """
    Assigns lead to best salesperson and returns salesperson_id
    """

    lead_score = lead.get("score", 50)  # default mid-score

    salespeople = list(users_collection.find(
        {"role": "salesperson"},
        {"_id": 0}
    ))

    if not salespeople:
        raise Exception("No salespeople available")

    scored = []

    for sp in salespeople:
        sp_score = score_salesperson(sp, lead_score)
        scored.append((sp["id"], sp_score))

    # pick highest score
    best_salesperson_id = max(scored, key=lambda x: x[1])[0]
    return best_salesperson_id