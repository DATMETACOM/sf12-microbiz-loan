from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

from sqlalchemy.orm import Session

from app.models.models import (
    CashFlow,
    KYCStatus,
    Loan,
    LoanPurpose,
    LoanStatus,
    NPLBucket,
    Platform,
    Repayment,
    RepaymentStatus,
    RiskSegment,
    Seller,
    SellerType,
)


def _parse_datetime(value: str | None):
    if not value:
        return None
    return datetime.fromisoformat(value)


def _load_json(seed_dir: Path, filename: str) -> list[dict]:
    with (seed_dir / filename).open("r", encoding="utf-8") as f:
        return json.load(f)


def _to_seller(row: dict) -> Seller:
    data = dict(row)
    data["seller_type"] = SellerType(data["seller_type"])
    data["platform"] = Platform(data["platform"])
    data["kyc_status"] = KYCStatus(data["kyc_status"])
    data["risk_segment"] = RiskSegment(data["risk_segment"])
    data["kyc_verified_at"] = _parse_datetime(data.get("kyc_verified_at"))
    data["consent_timestamp"] = _parse_datetime(data.get("consent_timestamp"))
    data["registered_at"] = _parse_datetime(data.get("registered_at"))
    data["last_active_at"] = _parse_datetime(data.get("last_active_at"))
    return Seller(**data)


def _to_cashflow(row: dict) -> CashFlow:
    data = dict(row)
    data["platform"] = Platform(data["platform"])
    data["created_at"] = _parse_datetime(data.get("created_at"))
    return CashFlow(**data)


def _to_loan(row: dict) -> Loan:
    data = dict(row)
    data["purpose"] = LoanPurpose(data["purpose"])
    data["status"] = LoanStatus(data["status"])
    data["npl_bucket"] = NPLBucket(data["npl_bucket"])
    data["disbursement_date"] = _parse_datetime(data.get("disbursement_date"))
    data["maturity_date"] = _parse_datetime(data.get("maturity_date"))
    data["created_at"] = _parse_datetime(data.get("created_at"))
    data["updated_at"] = _parse_datetime(data.get("updated_at"))
    return Loan(**data)


def _to_repayment(row: dict) -> Repayment:
    data = dict(row)
    data["status"] = RepaymentStatus(data["status"])
    data["due_date"] = _parse_datetime(data.get("due_date"))
    data["collection_date"] = _parse_datetime(data.get("collection_date"))
    data["paid_at"] = _parse_datetime(data.get("paid_at"))
    data["created_at"] = _parse_datetime(data.get("created_at"))
    return Repayment(**data)


def seed_demo_data(db: Session, seed_dir: Path, reset: bool = False) -> dict:
    if reset:
        db.query(Repayment).delete()
        db.query(Loan).delete()
        db.query(CashFlow).delete()
        db.query(Seller).delete()
        db.commit()

    existing = db.query(Seller.id).limit(1).first()
    if existing:
        return {"seeded": False, "reason": "existing_data"}

    sellers = _load_json(seed_dir, "sellers.json")
    cashflows = _load_json(seed_dir, "cashflows.json")
    loans = _load_json(seed_dir, "loans.json")
    repayments = _load_json(seed_dir, "repayments.json")

    db.bulk_save_objects([_to_seller(row) for row in sellers])
    db.bulk_save_objects([_to_cashflow(row) for row in cashflows])
    db.bulk_save_objects([_to_loan(row) for row in loans])
    db.bulk_save_objects([_to_repayment(row) for row in repayments])
    db.commit()

    return {
        "seeded": True,
        "sellers": len(sellers),
        "cashflows": len(cashflows),
        "loans": len(loans),
        "repayments": len(repayments),
    }
