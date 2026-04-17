# [SF11] Earned Wage Access & Salary-Linked Lending

## What This Is

Hệ thống Earned Wage Access (EWA) & Salary-Linked Lending cho **Shinhan Finance Việt Nam** — cho phép nhân viên tiếp cận lương đã kiếm được trước kỳ trả lương, và giải ngân khoản vay tín chấp dựa trên xác minh lương real-time từ hệ thống HRM/Payroll của doanh nghiệp đối tác. Sản phẩm loại bỏ hoàn toàn giấy tờ chứng minh thu nhập thủ công, giảm TAT (Turnaround Time) và chi phí acquisition.

Đây là **PoC Demo cho Qwen AI Build Day Hackathon**, cần thuyết phục ban giám khảo về tính khả thi thương mại và khả năng triển khai ngay tại Shinhan Finance.

## Core Value

**Xác minh lương real-time từ HRM/Payroll → giải ngân vay paperless trong phút** — loại bỏ bottleneck lớn nhất của lending thông thường: chứng minh thu nhập thủ công.

## Shinhan Finance Products Context

### Vay tín chấp cá nhân
- Lãi suất thấp từ 18%/năm
- Hạn mức vay đến 300 triệu VND
- Tùy chọn thanh toán đến 48 tháng

### Thẻ tín dụng "THE FIRST"
- Rút tiền mặt đến 100% hạn mức thẻ
- Miễn lãi suất lên đến 45 ngày
- Trả góp với ưu đãi 0% lãi suất
- 0.5% điểm thưởng tích lũy không giới hạn

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Real-time payroll verification từ hệ thống HRM/Payroll doanh nghiệp
- [ ] AI-powered salary data extraction & validation (Qwen AI)
- [ ] Earned Wage Access (EWA) — nhân viên rút lương đã kiếm trước payday
- [ ] Salary-linked loan disbursement paperless
- [ ] Credit scoring dựa trên dữ liệu lương real-time
- [ ] Auto-debit repayment từ payroll
- [ ] Dashboard cho enterprise HR admin quản lý chương trình
- [ ] Dashboard cho employee xem balance & request EWA/loan
- [ ] Admin dashboard cho Shinhan Finance quản lý portfolio
- [ ] Business case & market analysis documentation
- [ ] Pitch deck cho ban giám khảo
- [ ] Technical architecture documentation

### Out of Scope

- Integration thực tế với HRM systems (chỉ mock/demo) — time constraint hackathon
- KYC/AML compliance workflow đầy đủ — complexity too high for PoC
- Multi-currency support — không cần cho thị trường VN
- Mobile app native — focus web demo trước

## Context

- **Hackathon**: Qwen AI Build Day — cần showcase được khả năng của Qwen AI + Alibaba Cloud
- **Challenge code**: [SF11] từ Idea Contest
- **Target audience**: Ban giám khảo hackathon, stakeholder Shinhan Finance
- **Business pain point**: Lending truyền thống cần giấy tờ chứng minh thu nhập (payslip, hợp đồng lao động) → TAT dài 3-7 ngày, chi phí acquisition cao, NPL risk
- **NPL target**: <2% via auto-debit from payroll
- **Stakeholders**: Product, Risk, IT, Legal/Compliance, Sales (từ challenge description)
- **Shinhan Finance**: Công ty tài chính 100% vốn Hàn Quốc tại VN, focus vào consumer finance

## Constraints

- **Timeline**: Hackathon deadline — PoC cần hoàn thành trong thời gian hackathon
- **Tech**: Must use Qwen AI + Alibaba Cloud services (yêu cầu cuộc thi)
- **Scope**: PoC/Demo quality, không cần production-ready
- **Language**: Vietnamese UI/UX cho end users, English cho technical docs
- **Budget**: Free tier Alibaba Cloud cho hackathon
- **Data**: Mock data cho demo (không dùng dữ liệu thật)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Qwen AI cho salary verification & credit scoring | Yêu cầu bắt buộc của hackathon + khả năng AI thực tế | — Pending |
| Mock HRM/Payroll integration | Time constraint — không thể integrate hệ thống thật trong hackathon | — Pending |
| Web-based demo | Nhanh hơn mobile app, phù hợp cho pitch | — Pending |
| Focus cả EWA + Salary Loan | Challenge yêu cầu cả hai, cần demo cả hai flow | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2025-04-17 after initialization*
