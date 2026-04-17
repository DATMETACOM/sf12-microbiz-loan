import pandas as pd
import random
from datetime import datetime, timedelta
import json


def generate_mock_sellers(n: int = 20) -> list[dict]:
    platforms = ["shopee", "lazada", "tiktok_shop", "momo", "zalopay"]
    seller_types = ["ecommerce", "freelancer", "gig_worker"]
    names = [
        "Nguyen Van An",
        "Tran Thi Bich",
        "Le Hoang Cuong",
        "Pham Minh Duc",
        "Hoang Thi Emma",
        "Vo Thanh Phuoc",
        "Bui Quoc Gia",
        "Dang Thi Hoa",
        "Ngo Van Khoa",
        "Ly Thi Lan",
        "Cao Minh Manh",
        "Truong Quoc Nguyen",
        "Phan Thi Oanh",
        "Doan Van Phuc",
        "Ninh Thi Quynh",
        "Luong Thanh Son",
        "Dinh Thi Uyen",
        "Mai Van Vuong",
        "Ha Thi Xuan",
        "Tong Quang Yen",
    ]
    sellers = []
    for i in range(n):
        sellers.append(
            {
                "id": f"SLR{str(i + 1).zfill(4)}",
                "name": names[i],
                "phone": f"09{random.randint(10000000, 99999999)}",
                "email": f"seller{i + 1}@example.com",
                "seller_type": random.choice(seller_types),
                "shop_name": f"{names[i].split()[-1]} Shop",
                "platform": random.choice(platforms),
                "credit_score": random.randint(450, 800),
                "monthly_revenue_avg": round(random.uniform(5, 80) * 1_000_000, 0),
            }
        )
    return sellers


def generate_mock_cashflows(sellers: list[dict], months: int = 6) -> list[dict]:
    cashflows = []
    now = datetime.now()
    for seller in sellers:
        base_revenue = seller["monthly_revenue_avg"]
        for m in range(months):
            month_date = now - timedelta(days=30 * (months - m))
            revenue = base_revenue * random.uniform(0.7, 1.4)
            transactions = random.randint(50, 500)
            cashflows.append(
                {
                    "seller_id": seller["id"],
                    "platform": seller["platform"],
                    "month": month_date.strftime("%Y-%m"),
                    "revenue": round(revenue, 0),
                    "transactions": transactions,
                    "avg_order_value": round(revenue / transactions, 0),
                    "return_rate": round(random.uniform(0.01, 0.08), 3),
                    "growth_rate": round(random.uniform(-0.1, 0.3), 3),
                }
            )
    return cashflows


def generate_seed_data():
    sellers = generate_mock_sellers(20)
    cashflows = generate_mock_cashflows(sellers, 6)

    with open("seed_data/sellers.json", "w", encoding="utf-8") as f:
        json.dump(sellers, f, indent=2, ensure_ascii=False)

    with open("seed_data/cashflows.json", "w", encoding="utf-8") as f:
        json.dump(cashflows, f, indent=2, ensure_ascii=False)

    print(f"Generated: {len(sellers)} sellers, {len(cashflows)} cashflow records")


if __name__ == "__main__":
    generate_seed_data()
