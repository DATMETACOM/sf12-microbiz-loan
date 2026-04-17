# Deployment Guide - SF11 EWA & Salary-Linked Lending

Hướng dẫn deploy dự án lên GitHub và Vercel để test onsite.

## 📋 Prerequisites

- GitHub account
- Vercel account
- Qwen AI API Key từ [DashScope INTL](https://dashscope-intl.aliyuncs.com/)

## 🚀 Deploy lên GitHub

### 1. Khởi tạo Git Repository

```bash
cd D:\CODE\qwen-ai-build-day-wiki\sf12-microbiz-loan
git init
git add .
git commit -m "Initial commit: SF11 EWA & Salary-Linked Lending v2.0"
```

### 2. Tạo Repository trên GitHub

1. Vào [GitHub](https://github.com) → New repository
2. Repository name: `sf11-ewa-lending`
3. Public (hoặc Private nếu muốn)
4. Click "Create repository"

### 3. Push code lên GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/sf11-ewa-lending.git
git branch -M main
git push -u origin main
```

## 🌐 Deploy lên Vercel

### Cách 1: Deploy qua Vercel Dashboard

1. Vào [Vercel](https://vercel.com) → "Add New Project"
2. Import từ GitHub: `sf11-ewa-lending`
3. Cấu hình:

**Framework Preset:** Vite

**Build & Output Settings:**
- Build Command: `cd frontend && npm run build`
- Output Directory: `frontend/dist`
- Install Command: `cd frontend && npm install`

**Environment Variables:**
- `QWEN_API_KEY`: Nhập API key của bạn
- `VITE_API_URL`: URL backend (nếu có)
- `VITE_APP_NAME`: SF11 EWA & Salary-Linked Lending
- `VITE_APP_VERSION`: 2.0.0

4. Click "Deploy"

### Cách 2: Deploy qua Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy từ project root
cd D:\CODE\qwen-ai-build-day-wiki\sf12-microbiz-loan
vercel

# Follow prompts:
# - Set up and deploy: Yes
# - Which scope: Chọn account của bạn
# - Link to existing project: No
# - Project name: sf11-ewa-lending
# - Directory: ./
# - Override settings: Yes
# - Build Command: cd frontend && npm run build
# - Output Directory: frontend/dist
# - Install Command: cd frontend && npm install
```

## 🔧 Cấu hình Environment Variables

### Vercel Dashboard

1. Vào Project Settings → Environment Variables
2. Thêm các biến:

```bash
QWEN_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_API_URL=https://your-backend-url.com
VITE_APP_NAME=SF11 EWA & Salary-Linked Lending
VITE_APP_VERSION=2.0.0
```

### Local Development

```bash
# Copy example env file
cp .env.example .env

# Edit .env và thêm API key
# QWEN_API_KEY=your-api-key-here
```

## 🧪 Testing

### 1. Test Local

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

Mở browser: `http://localhost:5173`

### 2. Test Vercel Deployment

1. Vào Vercel dashboard → Click vào project
2. Copy URL từ "Domains" section
3. Test các tính năng:
   - Navigation giữa các tabs
   - Chatbox AI (cả desktop và mobile)
   - Shinhan Mobile App interface
   - EWA withdrawal flow

## 🎯 Quick Onsite Testing Checklist

- [ ] GitHub repository đã được tạo và push code
- [ ] Vercel deployment thành công
- [ ] Environment variables đã được cấu hình
- [ ] Chatbox AI hoạt động với Qwen API key
- [ ] Mobile interface responsive trên điện thoại
- [ ] Tất cả tabs navigation hoạt động
- [ ] Mock data hiển thị đúng
- [ ] Không có lỗi console

## 🔍 Troubleshooting

### Build Errors

```bash
# Clear cache và rebuild
cd frontend
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### API Key Issues

1. Kiểm tra API key format: `sk-xxxxxxxxxxxx`
2. Đảm bảo API key có quyền truy cập Qwen API
3. Test API key:

```bash
curl -X POST "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text-generation/generation" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen-plus",
    "input": {
      "messages": [{"role": "user", "content": "Hello"}]
    }
  }'
```

### Chatbox Not Working

1. Mở browser DevTools → Console
2. Kiểm tra error messages
3. Verify API key trong localStorage:
   ```javascript
   localStorage.getItem('qwen_api_key')
   ```
4. Test với Mock Data (tích vào "Sử dụng Mock Data")

## 📱 Mobile Testing

### Chrome DevTools

1. F12 → Toggle device toolbar (Ctrl+Shift+M)
2. Chọn device: iPhone 14 Pro
3. Test mobile interface

### Real Device

1. Deploy lên Vercel
2. Mở URL trên điện thoại
3. Add to Home Screen (PWA ready)

## 🚀 Pre-deployment Checklist

- [ ] Code đã commit và push lên GitHub
- [ ] .env.example đã được cập nhật
- [ ] README.md đã được cập nhật
- [ ] Không có hardcoded secrets
- [ ] API key được lưu trong environment variables
- [ ] Build local thành công
- [ ] Test local passes

## 📞 Support

Nếu gặp issues:
1. Check Vercel deployment logs
2. Check browser console errors
3. Verify API key permissions
4. Test with mock data first

---

**Happy Deploying! 🚀**
