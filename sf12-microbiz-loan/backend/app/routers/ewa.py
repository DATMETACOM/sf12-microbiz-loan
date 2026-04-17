from __future__ import annotations

from datetime import datetime, timedelta
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Seller
from app.schemas.schemas import EWAResponse, EWAApplication, CreditScoreResponse
from app.services.credit_score import calculate_credit_score

router = APIRouter(prefix="/api/ewa", tags=["ewa"])


def _enum_value(v):
    return v.value if hasattr(v, "value") else v


def _get_ewa_limit(monthly_salary: float) -> float:
    """
    Rule Engine: EWA limit cannot exceed 30% of monthly salary
    Compliance with Labor Law (Luật Lao động)
    """
    return monthly_salary * 0.3


def _validate_ewa_request(
    employee_id: str,
    requested_amount: float,
    monthly_salary: float,
    current_month_usage: float
) -> tuple[bool, str]:
    """
    Rule Engine validation for EWA requests
    """
    ewa_limit = _get_ewa_limit(monthly_salary)

    # Rule 1: Check 30% salary limit
    if requested_amount > ewa_limit:
        return False, f"Số tiền rút không được vượt quá 30% lương tháng ({ewa_limit:,.0f} VND)"

    # Rule 2: Check remaining limit
    remaining_limit = ewa_limit - current_month_usage
    if requested_amount > remaining_limit:
        return False, f"Hạn mức còn lại không đủ. Còn lại: {remaining_limit:,.0f} VND"

    # Rule 3: Minimum amount
    if requested_amount < 100000:
        return False, "Số tiền rút tối thiểu là 100,000 VND"

    return True, "OK"


@router.post("/apply", response_model=EWAResponse)
async def apply_ewa(application: EWAApplication, db: Session = Depends(get_db)):
    """
    Apply for Earned Wage Access (EWA)
    """
    # Mock employee data - in production, this would come from HRM integration
    employee = db.query(Seller).filter(Seller.id == application.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    monthly_salary = employee.monthly_revenue_avg  # Using revenue as salary proxy for demo
    current_month_usage = 2000000  # Mock: already used this month

    # Rule Engine validation
    is_valid, message = _validate_ewa_request(
        application.employee_id,
        application.amount,
        monthly_salary,
        current_month_usage
    )

    if not is_valid:
        raise HTTPException(status_code=400, detail=message)

    # Calculate fee (1.5% of amount)
    fee = application.amount * 0.015
    total_deduct = application.amount + fee
    net_amount = application.amount

    # Create EWA record (mock - would be saved to database in production)
    ewa_response = {
        "id": f"EWA{uuid4().hex[:8].upper()}",
        "employee_id": application.employee_id,
        "employee_name": employee.name,
        "amount": application.amount,
        "fee": fee,
        "total_deduct": total_deduct,
        "net_amount": net_amount,
        "status": "pending_biometric",
        "created_at": datetime.now(),
        "monthly_limit": _get_ewa_limit(monthly_salary),
        "current_month_usage": current_month_usage,
        "remaining_limit": _get_ewa_limit(monthly_salary) - current_month_usage - application.amount,
        "compliance_note": "Đảm bảo tuân thủ Luật Lao động: Không vượt quá 30% lương tháng"
    }

    return ewa_response


@router.post("/biometric-verify")
async def verify_biometric(
    ewa_id: str,
    biometric_type: str,  # "fingerprint" or "faceid"
    db: Session = Depends(get_db)
):
    """
    Verify biometric authentication for EWA disbursement
    Mock implementation - in production, this would integrate with
    device biometric APIs (FaceID, TouchID, Android Biometric)
    """
    # Mock verification - always succeeds for demo
    return {
        "success": True,
        "ewa_id": ewa_id,
        "biometric_type": biometric_type,
        "verified_at": datetime.now(),
        "device_id": "MOCK_DEVICE_123",
        "message": "Xác thực sinh trắc học thành công"
    }


@router.post("/disburse")
async def disburse_ewa(ewa_id: str, db: Session = Depends(get_db)):
    """
    Disburse EWA after biometric verification
    Mock implementation - in production, this would:
    1. Integrate with Core Banking API
    2. Use Message Queue for async processing
    3. Apply Circuit Breaker pattern for fault tolerance
    """
    # Mock disbursement
    return {
        "ewa_id": ewa_id,
        "status": "completed",
        "disbursed_at": datetime.now(),
        "estimated_arrival": "vài giây",
        "reference_number": f"REF{uuid4().hex[:10].upper()}",
        "message": "Tiền đã được chuyển vào tài khoản thành công"
    }


@router.get("/employee/{employee_id}")
async def get_employee_ewa_status(employee_id: str, db: Session = Depends(get_db)):
    """
    Get employee EWA status and limits
    """
    employee = db.query(Seller).filter(Seller.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    monthly_salary = employee.monthly_revenue_avg
    ewa_limit = _get_ewa_limit(monthly_salary)
    current_month_usage = 2000000  # Mock

    return {
        "employee_id": employee_id,
        "employee_name": employee.name,
        "monthly_salary": monthly_salary,
        "ewa_limit": ewa_limit,
        "current_month_usage": current_month_usage,
        "remaining_limit": ewa_limit - current_month_usage,
        "usage_percentage": (current_month_usage / ewa_limit) * 100,
        "days_worked": 24,  # Mock
        "total_days": 30,  # Mock
        "compliance": {
            "max_percentage": 30,
            "law_reference": "Luật Lao động Việt Nam",
            "note": "Hạn mức EWA không vượt quá 30% tổng lương tháng"
        }
    }


@router.get("/history/{employee_id}")
async def get_ewa_history(employee_id: str, limit: int = 10, db: Session = Depends(get_db)):
    """
    Get EWA transaction history for employee
    """
    # Mock history data
    history = [
        {
            "id": "EWA001",
            "date": "2026-04-15T10:30:00",
            "amount": 1000000,
            "fee": 15000,
            "status": "completed",
            "disbursed_at": "2026-04-15T10:30:05"
        },
        {
            "id": "EWA002",
            "date": "2026-04-10T14:15:00",
            "amount": 500000,
            "fee": 7500,
            "status": "completed",
            "disbursed_at": "2026-04-10T14:15:03"
        },
        {
            "id": "EWA003",
            "date": "2026-04-05T09:00:00",
            "amount": 500000,
            "fee": 7500,
            "status": "completed",
            "disbursed_at": "2026-04-05T09:00:02"
        }
    ]

    return {
        "employee_id": employee_id,
        "history": history[:limit],
        "total_count": len(history),
        "total_amount": sum(h["amount"] for h in history),
        "total_fees": sum(h["fee"] for h in history)
    }


@router.get("/limits/check")
async def check_ewa_limits(
    employee_id: str,
    amount: float,
    db: Session = Depends(get_db)
):
    """
    Check if EWA request is within limits before applying
    """
    employee = db.query(Seller).filter(Seller.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    monthly_salary = employee.monthly_revenue_avg
    current_month_usage = 2000000  # Mock

    is_valid, message = _validate_ewa_request(
        employee_id,
        amount,
        monthly_salary,
        current_month_usage
    )

    ewa_limit = _get_ewa_limit(monthly_salary)

    return {
        "employee_id": employee_id,
        "requested_amount": amount,
        "is_valid": is_valid,
        "message": message,
        "limits": {
            "monthly_limit": ewa_limit,
            "current_usage": current_month_usage,
            "remaining": ewa_limit - current_month_usage,
            "max_percentage": 30
        }
    }
