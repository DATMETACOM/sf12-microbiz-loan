from fastapi import APIRouter

router = APIRouter(prefix="/api/sellers", tags=["sellers"])


@router.get("/")
async def list_sellers():
    return {"sellers": [], "total": 0}


@router.get("/{seller_id}")
async def get_seller(seller_id: str):
    return {
        "id": seller_id,
        "name": "Demo Seller",
        "shop_name": "Demo Shop",
        "platform": "shopee",
        "credit_score": 650,
        "monthly_revenue_avg": 25000000,
    }


@router.get("/{seller_id}/cashflow")
async def get_seller_cashflow(seller_id: str, months: int = 6):
    return {
        "seller_id": seller_id,
        "cash_flows": [],
        "summary": {
            "avg_monthly_revenue": 25000000,
            "trend": "growing",
            "stability_score": 72,
        },
    }
