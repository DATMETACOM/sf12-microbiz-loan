from __future__ import annotations

import argparse
import json
import random
from datetime import datetime, timedelta
from pathlib import Path


FAMILY_NAMES = [
    "Nguyen",
    "Tran",
    "Le",
    "Pham",
    "Hoang",
    "Vo",
    "Dang",
    "Bui",
    "Ngo",
    "Duong",
    "Phan",
    "Do",
    "Dinh",
    "Truong",
]

MIDDLE_NAMES = [
    "Minh",
    "Thanh",
    "Quoc",
    "Gia",
    "Anh",
    "Huu",
    "Thi",
    "Duc",
    "Bao",
    "Ngoc",
    "Khac",
    "Tien",
    "Xuan",
]

GIVEN_NAMES = [
    "An",
    "Binh",
    "Cuong",
    "Dung",
    "Hanh",
    "Khanh",
    "Linh",
    "Nam",
    "Phuong",
    "Quyen",
    "Sang",
    "Thao",
    "Trinh",
    "Vy",
    "Yen",
    "Long",
    "Trang",
    "Hieu",
    "Tu",
    "Nhi",
]

PROVINCES = [
    "Ho Chi Minh",
    "Ha Noi",
    "Da Nang",
    "Can Tho",
    "Hai Phong",
    "Binh Duong",
    "Dong Nai",
    "Khanh Hoa",
    "Lam Dong",
    "Quang Ninh",
]

BUSINESS_MODELS = {
    "ecommerce": ["fashion_retail", "beauty_retail", "home_living", "electronics_retail"],
    "freelancer": ["design_service", "marketing_service", "software_service", "content_service"],
    "gig_worker": ["delivery_service", "food_service", "transport_service", "personal_service"],
}

PURPOSES = ["inventory", "working_capital", "marketing", "logistics", "equipment"]

PERSONAS = [
    {
        "name": "stable_ecommerce",
        "weight": 0.30,
        "seller_type": "ecommerce",
        "platforms": ["shopee", "lazada", "tiktok_shop"],
        "revenue_million": (25, 85),
        "volatility": (0.08, 0.18),
        "return_rate": (0.01, 0.04),
        "growth": (0.01, 0.05),
        "score": (680, 810),
        "dpd_prob": 0.02,
    },
    {
        "name": "growth_ecommerce",
        "weight": 0.22,
        "seller_type": "ecommerce",
        "platforms": ["shopee", "tiktok_shop", "lazada"],
        "revenue_million": (15, 60),
        "volatility": (0.12, 0.25),
        "return_rate": (0.02, 0.06),
        "growth": (0.04, 0.12),
        "score": (620, 760),
        "dpd_prob": 0.03,
    },
    {
        "name": "freelancer_specialist",
        "weight": 0.22,
        "seller_type": "freelancer",
        "platforms": ["momo", "zalopay", "vnpay"],
        "revenue_million": (10, 38),
        "volatility": (0.15, 0.30),
        "return_rate": (0.01, 0.05),
        "growth": (-0.02, 0.08),
        "score": (560, 730),
        "dpd_prob": 0.04,
    },
    {
        "name": "gig_worker_cashflow",
        "weight": 0.18,
        "seller_type": "gig_worker",
        "platforms": ["momo", "zalopay", "vnpay"],
        "revenue_million": (8, 28),
        "volatility": (0.18, 0.35),
        "return_rate": (0.00, 0.03),
        "growth": (-0.03, 0.05),
        "score": (500, 690),
        "dpd_prob": 0.06,
    },
    {
        "name": "high_risk_new",
        "weight": 0.08,
        "seller_type": "gig_worker",
        "platforms": ["tiktok_shop", "momo", "zalopay"],
        "revenue_million": (5, 18),
        "volatility": (0.30, 0.55),
        "return_rate": (0.04, 0.12),
        "growth": (-0.08, 0.04),
        "score": (430, 600),
        "dpd_prob": 0.12,
    },
]


def _iso(dt: datetime | None) -> str | None:
    if not dt:
        return None
    return dt.isoformat(timespec="seconds")


def _weighted_choice(rng: random.Random, items: list[dict]) -> dict:
    marker = rng.random()
    cumulative = 0.0
    for item in items:
        cumulative += item["weight"]
        if marker <= cumulative:
            return item
    return items[-1]


def _risk_segment(score: int) -> str:
    if score >= 730:
        return "low"
    if score >= 620:
        return "medium"
    if score >= 520:
        return "high"
    return "watchlist"


def _pd_from_score(score: int) -> float:
    score_clamped = max(300, min(850, score))
    pd = 0.30 - ((score_clamped - 300) / 550) * 0.27
    return round(max(0.02, min(0.30, pd)), 4)


def _bank_mask(rng: random.Random) -> tuple[str, str]:
    account = f"{rng.randint(1000, 9999)}{rng.randint(1000, 9999)}{rng.randint(1000, 9999)}"
    masked = f"{account[:4]}******{account[-4:]}"
    return account, masked


def _make_name_pool(target: int, rng: random.Random) -> list[str]:
    names: set[str] = set()
    while len(names) < target:
        names.add(
            f"{rng.choice(FAMILY_NAMES)} {rng.choice(MIDDLE_NAMES)} {rng.choice(GIVEN_NAMES)}"
        )
    return list(names)


def _month_list(months: int, ref: datetime) -> list[str]:
    out = []
    first_day = datetime(ref.year, ref.month, 1)
    for idx in range(months):
        d = first_day - timedelta(days=30 * (months - idx - 1))
        out.append(d.strftime("%Y-%m"))
    return out


def _credit_policy(score: int) -> tuple[float, float]:
    if score >= 730:
        return 0.16, 6.0
    if score >= 650:
        return 0.18, 8.0
    if score >= 560:
        return 0.21, 10.0
    return 0.24, 12.0


def generate_dataset(
    customers: int = 50, months: int = 8, seed: int = 42
) -> tuple[list[dict], list[dict], list[dict], list[dict]]:
    rng = random.Random(seed)
    ref_time = datetime.now()
    month_keys = _month_list(months, ref_time)
    names = _make_name_pool(customers, rng)

    sellers: list[dict] = []
    cashflows: list[dict] = []
    loans: list[dict] = []
    repayments: list[dict] = []

    statuses = ["active"] * 30 + ["repaid"] * 12 + ["pending"] * 6 + ["overdue"] * 2
    rng.shuffle(statuses)

    cashflow_id = 1
    repayment_id = 1

    for idx in range(1, customers + 1):
        persona = _weighted_choice(rng, PERSONAS)
        seller_id = f"SLR{idx:04d}"
        customer_no = f"CUS{idx:06d}"
        full_name = names[idx - 1]
        seller_type = persona["seller_type"]
        platform = rng.choice(persona["platforms"])
        business_model = rng.choice(BUSINESS_MODELS[seller_type])
        province = rng.choice(PROVINCES)
        onboarding_channel = rng.choice(["app", "web", "partner_api"])

        base_revenue = rng.uniform(*persona["revenue_million"]) * 1_000_000
        credit_score = int(rng.uniform(*persona["score"]))
        risk_segment = _risk_segment(credit_score)
        pd_estimate = _pd_from_score(credit_score)
        device_risk_score = round(
            rng.uniform(8, 35) if risk_segment in {"low", "medium"} else rng.uniform(35, 80),
            2,
        )
        fraud_score = round(
            rng.uniform(5, 30) if risk_segment in {"low", "medium"} else rng.uniform(30, 75),
            2,
        )

        cic_available = rng.random() < (0.24 if seller_type == "ecommerce" else 0.16)
        cic_score = int(rng.uniform(560, 760)) if cic_available else None
        loan_limit = max(
            5_000_000,
            min(50_000_000, round(base_revenue * rng.uniform(1.0, 1.7), -3)),
        )
        avg_wallet_inflow = round(base_revenue * rng.uniform(0.75, 1.05), 0)
        avg_wallet_outflow = round(base_revenue * rng.uniform(0.52, 0.88), 0)
        dsr_ratio = round(rng.uniform(0.18, 0.62), 3)

        account_raw, bank_masked = _bank_mask(rng)
        va_no = f"9704{idx:06d}{rng.randint(1000, 9999)}"
        registered_at = ref_time - timedelta(days=rng.randint(45, 720))
        kyc_verified_at = registered_at + timedelta(days=rng.randint(1, 3))
        consent_ts = registered_at + timedelta(days=rng.randint(0, 2))
        last_active_at = ref_time - timedelta(days=rng.randint(0, 14))

        sellers.append(
            {
                "id": seller_id,
                "customer_no": customer_no,
                "name": full_name,
                "phone": f"0{rng.choice([3, 5, 7, 8, 9])}{rng.randint(10000000, 99999999)}",
                "email": f"seller{idx:03d}@microbiz.vn",
                "seller_type": seller_type,
                "shop_name": f"{full_name.split()[-1]} {rng.choice(['Store', 'Studio', 'Hub', 'Shop'])}",
                "platform": platform,
                "business_model": business_model,
                "operating_province": province,
                "onboarding_channel": onboarding_channel,
                "kyc_status": "verified",
                "kyc_verified_at": _iso(kyc_verified_at),
                "consent_data_sharing": True,
                "consent_timestamp": _iso(consent_ts),
                "cic_available": cic_available,
                "cic_score": cic_score,
                "risk_segment": risk_segment,
                "pd_estimate": pd_estimate,
                "fraud_score": fraud_score,
                "device_risk_score": device_risk_score,
                "registered_at": _iso(registered_at),
                "credit_score": credit_score,
                "monthly_revenue_avg": round(base_revenue, 0),
                "avg_wallet_inflow_30d": avg_wallet_inflow,
                "avg_wallet_outflow_30d": avg_wallet_outflow,
                "dsr_ratio": dsr_ratio,
                "loan_limit": loan_limit,
                "loan_cycle_count": rng.randint(0, 4),
                "delinquency_30d": 1 if rng.random() < persona["dpd_prob"] else 0,
                "virtual_account_no": va_no,
                "bank_account_masked": bank_masked,
                "preferred_settlement_channel": rng.choice(["bank_transfer", "e_wallet"]),
                "last_active_at": _iso(last_active_at),
            }
        )

        trend = rng.uniform(*persona["growth"])
        volatility = rng.uniform(*persona["volatility"])
        return_base = rng.uniform(*persona["return_rate"])
        previous_revenue = base_revenue * rng.uniform(0.85, 1.05)

        for month in month_keys:
            seasonal = 1.08 if month.endswith("-12") else 1.02 if month.endswith("-11") else 1.0
            noise = rng.uniform(-volatility, volatility)
            revenue = max(
                1_800_000, previous_revenue * (1 + trend + noise) * seasonal
            )

            avg_ticket = (
                rng.uniform(180_000, 420_000)
                if seller_type == "ecommerce"
                else rng.uniform(350_000, 1_100_000)
                if seller_type == "freelancer"
                else rng.uniform(70_000, 220_000)
            )
            transactions = max(28, int(revenue / avg_ticket))
            return_rate = max(0.0, min(0.2, return_base + rng.uniform(-0.01, 0.02)))
            successful_orders = max(1, int(transactions * (1 - return_rate)))
            cancelled_orders = max(0, transactions - successful_orders)
            gmv = revenue * rng.uniform(1.05, 1.22)
            refund_amount = gmv * return_rate * rng.uniform(0.55, 0.9)
            chargeback_amount = gmv * rng.uniform(0.0008, 0.011)
            wallet_inflow = revenue * rng.uniform(0.72, 1.02)
            wallet_outflow = revenue * rng.uniform(0.5, 0.88)
            cod_inflow = revenue * (
                rng.uniform(0.18, 0.42) if seller_type == "ecommerce" else rng.uniform(0.0, 0.12)
            )
            platform_fee = gmv * rng.uniform(0.03, 0.085)
            marketing_spend = revenue * rng.uniform(0.03, 0.2)
            anomaly_score = round(
                rng.uniform(5, 35) if risk_segment in {"low", "medium"} else rng.uniform(25, 80),
                2,
            )
            payout_to_va = revenue * rng.uniform(0.74, 0.96)
            growth_rate = ((revenue / previous_revenue) - 1) if previous_revenue > 0 else 0

            cashflows.append(
                {
                    "id": f"CF{cashflow_id:06d}",
                    "seller_id": seller_id,
                    "platform": platform,
                    "month": month,
                    "gross_merchandise_value": round(gmv, 0),
                    "net_sales": round(revenue, 0),
                    "revenue": round(revenue, 0),
                    "transactions": transactions,
                    "successful_orders": successful_orders,
                    "cancelled_orders": cancelled_orders,
                    "avg_order_value": round(revenue / transactions, 0),
                    "return_rate": round(return_rate, 4),
                    "refund_amount": round(refund_amount, 0),
                    "chargeback_amount": round(chargeback_amount, 0),
                    "wallet_inflow": round(wallet_inflow, 0),
                    "wallet_outflow": round(wallet_outflow, 0),
                    "cod_inflow": round(cod_inflow, 0),
                    "platform_fee": round(platform_fee, 0),
                    "marketing_spend": round(marketing_spend, 0),
                    "growth_rate": round(growth_rate, 4),
                    "seasonality_index": round(seasonal, 3),
                    "anomaly_score": anomaly_score,
                    "payout_to_va": round(payout_to_va, 0),
                    "created_at": _iso(ref_time),
                }
            )
            cashflow_id += 1
            previous_revenue = revenue

        loan_status = statuses[idx - 1]
        requested_amount = round(
            max(5_000_000, min(50_000_000, base_revenue * rng.uniform(0.65, 1.45))), -3
        )
        approved_amount = round(min(requested_amount, loan_limit), -3)
        interest_rate, revenue_percent = _credit_policy(credit_score)
        tenure = rng.choice([3, 6, 9, 12])
        disbursement_date = (
            registered_at + timedelta(days=rng.randint(8, 120)) if loan_status != "pending" else None
        )
        maturity_date = (
            disbursement_date + timedelta(days=30 * tenure) if disbursement_date else None
        )
        disbursed_amount = approved_amount if loan_status != "pending" else 0

        if loan_status == "repaid":
            amount_repaid = round(disbursed_amount * rng.uniform(1.02, 1.12), -3)
            outstanding = 0
            days_past_due = 0
            npl_bucket = "current"
        elif loan_status == "active":
            amount_repaid = round(disbursed_amount * rng.uniform(0.25, 0.82), -3)
            outstanding = max(0, round(disbursed_amount - amount_repaid, -3))
            days_past_due = rng.randint(0, 12)
            npl_bucket = "watch" if days_past_due > 0 else "current"
        elif loan_status == "overdue":
            amount_repaid = round(disbursed_amount * rng.uniform(0.1, 0.48), -3)
            outstanding = max(0, round(disbursed_amount - amount_repaid, -3))
            days_past_due = rng.randint(32, 95)
            npl_bucket = "substandard" if days_past_due < 60 else "doubtful"
        else:
            amount_repaid = 0
            outstanding = 0
            days_past_due = 0
            npl_bucket = "current"

        cap_total_payable = round(
            max(approved_amount, approved_amount * (1 + 0.2 * (tenure / 12))), -3
        )
        ai_score = int(max(300, min(850, credit_score + rng.randint(-18, 20))))
        risk_codes = []
        if risk_segment in {"high", "watchlist"}:
            risk_codes.append("RISK_SEGMENT_ELEVATED")
        if dsr_ratio > 0.5:
            risk_codes.append("DSR_HIGH")
        if persona["name"] == "high_risk_new":
            risk_codes.append("TENURE_SHORT_HISTORY")
        if not risk_codes:
            risk_codes = ["CASHFLOW_STABLE", "KYC_VERIFIED"]

        loan_id = f"LOAN{idx:06d}"
        loans.append(
            {
                "id": loan_id,
                "application_no": f"APP{idx:06d}",
                "seller_id": seller_id,
                "purpose": rng.choice(PURPOSES),
                "requested_amount": requested_amount,
                "approved_amount": approved_amount,
                "amount": approved_amount,
                "disbursed_amount": disbursed_amount,
                "outstanding_principal": outstanding,
                "amount_repaid": amount_repaid,
                "interest_rate": interest_rate,
                "apr_percent": round(interest_rate * 100 + rng.uniform(1.8, 3.2), 2),
                "origination_fee": round(approved_amount * rng.uniform(0.008, 0.022), -3),
                "tenure_months": tenure,
                "repayment_type": "revenue_percent",
                "revenue_percent": revenue_percent,
                "cap_rate_annual": 0.2,
                "cap_total_payable": cap_total_payable,
                "status": loan_status,
                "ai_score": ai_score,
                "ai_risk_factors": json.dumps(risk_codes),
                "reason_codes": json.dumps(risk_codes[:2]),
                "days_past_due": days_past_due,
                "npl_bucket": npl_bucket,
                "disbursement_date": _iso(disbursement_date),
                "maturity_date": _iso(maturity_date),
                "created_at": _iso((disbursement_date or ref_time) - timedelta(days=3)),
                "updated_at": _iso(ref_time),
            }
        )

        if loan_status == "pending":
            continue

        record_count = min(tenure, max(3, (datetime.now() - disbursement_date).days // 30 + 1))
        outstanding_running = disbursed_amount
        principal_monthly = disbursed_amount / tenure
        for installment in range(1, record_count + 1):
            due_date = disbursement_date + timedelta(days=30 * installment)
            actual_revenue = round(base_revenue * rng.uniform(0.72, 1.2), 0)
            principal_component = round(principal_monthly, 0)
            interest_component = round(outstanding_running * (interest_rate / 12), 0)
            fee_component = round(principal_component * 0.004, 0)
            amount_due = round(principal_component + interest_component + fee_component, 0)

            if loan_status == "repaid":
                amount_paid = amount_due
                status = "paid"
            elif loan_status == "active":
                if installment < record_count - 1:
                    amount_paid = amount_due
                    status = "paid"
                elif installment == record_count - 1:
                    amount_paid = round(amount_due * rng.uniform(0.75, 1.0), 0)
                    status = "partial" if amount_paid < amount_due else "paid"
                else:
                    amount_paid = round(amount_due * rng.uniform(0.55, 0.95), 0)
                    status = "partial"
            else:
                if installment < record_count - 1:
                    amount_paid = round(amount_due * rng.uniform(0.75, 1.0), 0)
                    status = "paid" if amount_paid >= amount_due * 0.98 else "partial"
                else:
                    amount_paid = round(amount_due * rng.uniform(0.0, 0.35), 0)
                    status = "overdue"

            principal_paid = min(principal_component, amount_paid)
            outstanding_running = max(0, round(outstanding_running - principal_paid, 0))
            paid_at = due_date + timedelta(days=rng.randint(0, 2)) if amount_paid > 0 else None

            repayments.append(
                {
                    "id": f"RP{repayment_id:07d}",
                    "loan_id": loan_id,
                    "due_date": _iso(due_date),
                    "collection_date": _iso(due_date + timedelta(days=rng.randint(0, 2)))
                    if amount_paid > 0
                    else None,
                    "amount_due": amount_due,
                    "amount_paid": amount_paid,
                    "principal_component": principal_component,
                    "interest_component": interest_component,
                    "fee_component": fee_component,
                    "revenue_share_percent": revenue_percent,
                    "actual_revenue": actual_revenue,
                    "status": status,
                    "collection_channel": "virtual_account",
                    "source_txn_ref": f"TXN{idx:04d}{installment:03d}",
                    "idempotency_key": f"IDEMP-{loan_id}-{installment:03d}",
                    "remaining_principal": outstanding_running,
                    "paid_at": _iso(paid_at),
                    "created_at": _iso(ref_time),
                }
            )
            repayment_id += 1

    return sellers, cashflows, loans, repayments


def generate_seed_data(customers: int = 50, months: int = 8, seed: int = 42):
    sellers, cashflows, loans, repayments = generate_dataset(
        customers=customers, months=months, seed=seed
    )

    base_dir = Path(__file__).resolve().parent
    (base_dir / "sellers.json").write_text(
        json.dumps(sellers, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    (base_dir / "cashflows.json").write_text(
        json.dumps(cashflows, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    (base_dir / "loans.json").write_text(
        json.dumps(loans, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    (base_dir / "repayments.json").write_text(
        json.dumps(repayments, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    overdue = sum(1 for loan in loans if loan["status"] == "overdue")
    npl_rate = overdue / len(loans) * 100 if loans else 0
    print(
        f"Generated {len(sellers)} sellers, {len(cashflows)} cashflows, "
        f"{len(loans)} loans, {len(repayments)} repayments | NPL~{npl_rate:.2f}%"
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate realistic micro-lending demo dataset for SF12"
    )
    parser.add_argument("--customers", type=int, default=50)
    parser.add_argument("--months", type=int, default=8)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()
    generate_seed_data(customers=args.customers, months=args.months, seed=args.seed)
