# Hướng dẫn Setup Biến Môi Trường trong GitHub Actions

## Các cách quản lý biến môi trường

### 1. GitHub Variables (Khuyến nghị cho non-sensitive data)

**Khi nào dùng:**
- API URLs (public)
- Feature flags
- Config values không nhạy cảm

**Cách setup:**
1. Repository → Settings → Secrets and variables → Actions
2. Tab "Variables" → New repository variable
3. Name: `VITE_API_URL`
4. Value: `https://jsonplaceholder.typicode.com`
5. Save

**Trong workflow:**
```yaml
env:
  VITE_API_URL: ${{ vars.VITE_API_URL || 'https://jsonplaceholder.typicode.com' }}
```

**Ưu điểm:**
- ✅ Dễ quản lý (UI trên GitHub)
- ✅ Có thể thay đổi không cần push code
- ✅ Không bị lộ trong logs
- ✅ Có thể set khác nhau cho từng environment

---

### 2. GitHub Secrets (Cho sensitive data)

**Khi nào dùng:**
- API keys
- Passwords
- Tokens
- Private keys

**Cách setup:**
1. Repository → Settings → Secrets and variables → Actions
2. Tab "Secrets" → New repository secret
3. Name: `VITE_API_KEY`
4. Value: `your-secret-key`
5. Save

**Trong workflow:**
```yaml
env:
  VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
```

**Ưu điểm:**
- ✅ Bảo mật cao (mã hóa)
- ✅ Không thể xem lại value sau khi save
- ✅ Tự động mask trong logs

---

### 3. Hardcode trong workflow (Không khuyến nghị)

**Khi nào dùng:**
- Chỉ cho development/testing
- Giá trị cố định, không bao giờ thay đổi

**Trong workflow:**
```yaml
env:
  VITE_API_URL: https://jsonplaceholder.typicode.com
```

**Nhược điểm:**
- ❌ Phải commit vào code
- ❌ Khó quản lý nhiều environments
- ❌ Phải push code để thay đổi

---

### 4. Tạo file .env trong workflow (Nâng cao)

**Khi nào dùng:**
- Cần nhiều biến từ nhiều nguồn
- Muốn tạo file .env giống local

**Trong workflow:**
```yaml
- name: Create .env file
  run: |
    cat > .env << EOF
    VITE_API_URL=${{ vars.VITE_API_URL || 'https://jsonplaceholder.typicode.com' }}
    VITE_APP_NAME=My App
    EOF
```

---

## So sánh

| Cách | Khi nào dùng | Security | Dễ quản lý |
|------|--------------|----------|------------|
| GitHub Variables | Non-sensitive config | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| GitHub Secrets | Sensitive data | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Hardcode | Development only | ⭐ | ⭐⭐ |
| File .env trong workflow | Multiple variables | ⭐⭐⭐ | ⭐⭐⭐ |

---

## Workflow hiện tại

Workflow đã được setup để:
1. **Ưu tiên** đọc từ GitHub Variables (`vars.VITE_API_URL`)
2. **Fallback** về giá trị mặc định nếu không có

```yaml
env:
  VITE_API_URL: ${{ vars.VITE_API_URL || 'https://jsonplaceholder.typicode.com' }}
```

### Cách dùng:

**Option 1: Không setup Variables (dùng default)**
- Workflow sẽ tự động dùng `https://jsonplaceholder.typicode.com`
- Không cần làm gì thêm

**Option 2: Setup Variables (khuyến nghị)**
1. Setup GitHub Variable `VITE_API_URL` như hướng dẫn trên
2. Workflow sẽ tự động dùng giá trị từ Variables
3. Có thể thay đổi giá trị trên GitHub UI mà không cần push code

---

## Best Practices

1. ✅ Dùng **GitHub Variables** cho non-sensitive config
2. ✅ Dùng **GitHub Secrets** cho sensitive data
3. ✅ Luôn có **fallback value** trong workflow
4. ✅ Document rõ trong README hoặc docs
5. ✅ Không hardcode sensitive data trong code

---

## Ví dụ đầy đủ

### Setup GitHub Variables:
- Name: `VITE_API_URL`
- Value: `https://api.production.com`

### Workflow sẽ:
```yaml
env:
  VITE_API_URL: ${{ vars.VITE_API_URL || 'https://jsonplaceholder.typicode.com' }}
```

### Kết quả:
- Nếu có Variable → Dùng `https://api.production.com`
- Nếu không có → Dùng `https://jsonplaceholder.typicode.com`

