# Quick Start Guide - SF11 EWA & Salary-Linked Lending

## 🚀 Bắt đầu nhanh trong 5 phút

### 1. Clone & Setup

```bash
# Nếu đã có code, skip bước này
cd D:\CODE\qwen-ai-build-day-wiki\sf12-microbiz-loan
```

### 2. Cấu hình API Key (Optional)

```bash
# Copy env template
cp .env.example .env

# Edit .env và thêm Qwen API Key (nếu có)
# QWEN_API_KEY=your-api-key-here
```

**Lưu ý:** Nếu không có API Key, chatbox sẽ tự động sử dụng Mock Data cho demo.

### 3. Chạy Local

```bash
# Terminal 1: Backend
cd backend
pip install -r requirements.txt
fastapi dev app/main.py

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

### 4. Mở Browser

```
http://localhost:5173
```

## 🎯 Tính năng chính

### Navigation (8 Tabs)

1. **Tổng quan** - Value proposition & architecture
2. **App Shinhan** - Mobile banking interface
3. **Trợ lý Thông minh** - AI chatbot (desktop)
4. **Nhân viên** - EWA dashboard & withdrawal
5. **HR & Doanh nghiệp** - Financial wellness management
6. **Ngân hàng & Admin** - Portfolio & risk management
7. **AI Quản trị rủi ro** - Churn prediction & fraud detection
8. **Sức khỏe tài chính** - Wellness scoring & recommendations

### AI Chatbox

**Desktop:**
- Click vào icon 💬 ở góc dưới bên phải
- Nhập câu hỏi hoặc chọn suggested questions
- Hỗ trợ cả Mock Mode và Real Qwen API

**Mobile (trong App Shinhan):**
- Click vào tab "Chat AI" ở bottom navigation
- Hoặc click icon bell ở header
- Quick actions cho EWA, chi tiêu, tiết kiệm

## 🧪 Test Scenarios

### Scenario 1: Nhân viên rút EWA

1. Vào tab "Nhân viên" hoặc "App Shinhan"
2. Click "Rút EWA" hoặc nút tia sét ⚡
3. Nhập số tiền (ví dụ: 500000)
4. Xem tính toán phí (1.5%)
5. Click "Rút ngay" → Simulate biometric auth

### Scenario 2: Chat với AI

1. Click icon chatbox 💬
2. Nhập: "Tôi cần ứng 500k mua thuốc"
3. AI sẽ tư vấn và gợi ý hạn mức an toàn
4. Thử các câu hỏi khác từ suggested list

### Scenario 3: HR Dashboard

1. Vào tab "HR & Doanh nghiệp"
2. Xem heatmap sức khỏe tài chính
3. Check recommendations cho các department
4. Xem segmentation nhân viên

### Scenario 4: Bank Admin

1. Vào tab "Ngân hàng & Admin"
2. Xem NPL rate (target <2%)
3. Check corporate health scores
4. Review recent transactions

## 🔧 Cấu hình API Key

### Lấy Qwen API Key

1. Vào [DashScope INTL](https://dashscope-intl.aliyuncs.com/)
2. Đăng ký / Login
3. Vào API Key Management
4. Create new API key
5. Copy key (format: `sk-xxxxxxxxxxxx`)

### Cấu hình trong App

**Cách 1: Chatbox Settings**
1. Mở chatbox
2. Click icon Settings ⚙️
3. Bỏ chọn "Sử dụng Mock Data"
4. Nhập API Key
5. Click "Lưu"

**Cách 2: Environment Variables**
```bash
# .env file
QWEN_API_KEY=sk-your-api-key-here
```

## 📱 Mobile Testing

### Chrome DevTools

1. F12 → Ctrl+Shift+M (Device Toolbar)
2. Chọn device: iPhone 14 Pro / Samsung Galaxy
3. Test responsive interface

### Real Device

```bash
# Deploy local network
cd frontend
npm run dev -- --host

# Mở IP address trên điện thoại
# Ví dụ: http://192.168.1.100:5173
```

## 🐛 Troubleshooting

### Port already in use

```bash
# Frontend
cd frontend
npm run dev -- --port 3000

# Backend
cd backend
fastapi dev app/main.py --port 8001
```

### Build errors

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Chatbox not responding

1. Mổ DevTools → Console
2. Check error messages
3. Test với Mock Data (bỏ chọn "Sử dụng Mock Data")
4. Verify API key format

### API connection issues

```bash
# Test API key manually
curl -X POST "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text-generation/generation" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"qwen-plus","input":{"messages":[{"role":"user","content":"test"}]}}'
```

## 📊 Mock Data

Dự án sử dụng mock data cho demo purposes:

- **Employee data**: 50 mock sellers
- **Cashflow data**: 8 months history
- **EWA transactions**: Sample transactions
- **Chat responses**: Smart mock responses

Để reset mock data:

```bash
cd backend
python seed_data/generate_mock_data.py --customers 50 --months 8
```

## 🎨 Customization

### Thay đổi colors

Edit `frontend/src/index.css`:

```css
:root {
  --primary: #3b82f6; /* Màu chính */
  --secondary: #10b981; /* Màu phụ */
  /* ... */
}
```

### Thay đổi content

Edit files trong `frontend/src/pages/sf11/`:
- `Landing.tsx` - Trang tổng quan
- `EmployeeDashboard.tsx` - Dashboard nhân viên
- `HRDashboard.tsx` - Dashboard HR
- `BankDashboard.tsx` - Dashboard ngân hàng

## 📚 Documentation

- **README.md** - Tổng quan dự án
- **DEPLOYMENT.md** - Hướng dẫn deploy GitHub/Vercel
- **QUICKSTART.md** - File này
- **docs/** - Chi tiết architecture & requirements

## 🚀 Next Steps

1. ✅ Test local functionality
2. ✅ Configure API key (optional)
3. ✅ Deploy to Vercel (see DEPLOYMENT.md)
4. ✅ Test on mobile devices
5. ✅ Prepare for onsite demo

## 💡 Tips for Demo

- Sử dụng Mock Data cho demo ổn định
- Mở browser fullscreen (F11)
- Chuẩn bị sẵn vài câu hỏi cho chatbox demo
- Test mobile interface trước khi present
- Có backup screenshot/video nếu cần

---

**Need help? Check DEPLOYMENT.md or open an issue on GitHub!**
