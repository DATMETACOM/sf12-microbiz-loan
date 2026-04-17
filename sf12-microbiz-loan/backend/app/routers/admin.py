from fastapi import APIRouter

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.get("/dashboard")
async def dashboard():
    return {
        "total_sellers": 0,
        "active_loans": 0,
        "total_disbursed": 0,
        "npl_rate": 0,
        "avg_credit_score": 0,
    }


@router.get("/portfolio")
async def portfolio():
    return {"loans": [], "summary": {}}


@router.get("/risk-analytics")
async def risk_analytics():
    return {
        "npl_rate": 0,
        "delinquency_by_segment": {},
        "score_distribution": {},
    }
