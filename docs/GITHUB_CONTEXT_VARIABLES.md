# GitHub Actions Context Variables

## 🔍 `github.ref` là gì?

`github.ref` là một biến context trong GitHub Actions, chứa **full git ref** của event trigger workflow.

### Giá trị của `github.ref`:

| Event | Giá trị của `github.ref` |
|-------|--------------------------|
| Push to `main` branch | `refs/heads/main` |
| Push to `develop` branch | `refs/heads/develop` |
| Push to `feature/xyz` branch | `refs/heads/feature/xyz` |
| Push tag `v1.0.0` | `refs/tags/v1.0.0` |
| Pull Request | `refs/pull/123/merge` |

### Ví dụ cụ thể:

```yaml
# Khi push lên branch main
github.ref = "refs/heads/main"

# Khi push tag v1.0.0
github.ref = "refs/tags/v1.0.0"
```

---

## 🎯 Tại sao dùng `github.ref` trong Concurrency?

Trong workflow của bạn:

```yaml
concurrency:
  group: self-hosted-deploy-${{ github.ref }}
  cancel-in-progress: true
```

### Ý nghĩa:

1. **Group name**: `self-hosted-deploy-${{ github.ref }}`
   - Nếu push lên `main` → Group = `self-hosted-deploy-refs/heads/main`
   - Nếu push lên `develop` → Group = `self-hosted-deploy-refs/heads/develop`

2. **Tác dụng**:
   - ✅ Mỗi branch có **group riêng** → Không conflict
   - ✅ Chỉ cancel workflow **cùng branch**
   - ✅ Workflow từ branch khác vẫn chạy song song

### Ví dụ thực tế:

```
Bạn đang có:
- Workflow từ branch main đang chạy (job #1)
- Workflow từ branch develop đang chạy (job #2)

Khi push mới lên main:
- ✅ Cancel job #1 (cùng branch)
- ❌ Không cancel job #2 (khác branch)

→ Cả 2 workflows có thể chạy song song!
```

---

## 📊 So sánh các cách dùng Concurrency:

### Cách 1: Dùng `github.ref` (Khuyến nghị - Đã dùng)

```yaml
concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: true
```

**Ưu điểm:**
- ✅ Mỗi branch có group riêng
- ✅ Workflows từ branch khác không conflict
- ✅ Linh hoạt với nhiều branches

**Kết quả:**
- Push main → Cancel workflow cũ của main
- Push develop → Cancel workflow cũ của develop
- 2 workflows có thể chạy song song

---

### Cách 2: Dùng tên cố định (Không khuyến nghị)

```yaml
concurrency:
  group: deploy
  cancel-in-progress: true
```

**Nhược điểm:**
- ❌ Tất cả branches dùng chung 1 group
- ❌ Workflow từ branch khác cũng bị cancel
- ❌ Không linh hoạt

**Kết quả:**
- Push main → Cancel TẤT CẢ workflows đang chạy (kể cả từ develop)
- ❌ Không thể chạy song song workflows từ branch khác

---

### Cách 3: Dùng `github.ref_name` (Đơn giản hơn)

```yaml
concurrency:
  group: deploy-${{ github.ref_name }}
  cancel-in-progress: true
```

**`github.ref_name` là gì?**
- Chỉ lấy phần tên branch/tag (không có `refs/heads/`)
- `refs/heads/main` → `main`
- `refs/tags/v1.0.0` → `v1.0.0`

**Ưu điểm:**
- ✅ Group name ngắn gọn hơn
- ✅ Dễ đọc hơn

**So sánh:**

| Context Variable | Giá trị (push main) | Group Name |
|-----------------|---------------------|------------|
| `github.ref` | `refs/heads/main` | `deploy-refs/heads/main` |
| `github.ref_name` | `main` | `deploy-main` ✨ (ngắn gọn hơn) |

---

## 🎯 Các GitHub Context Variables hữu ích khác:

### `github.sha`
- Full commit SHA
- Ví dụ: `abc123def456...`

**Dùng trong workflow:**
```yaml
docker build -t app:${{ github.sha }} .
# → app:abc123def456...
```

---

### `github.ref_name`
- Tên branch hoặc tag (không có prefix)
- Ví dụ: `main`, `develop`, `v1.0.0`

**Dùng trong workflow:**
```yaml
concurrency:
  group: deploy-${{ github.ref_name }}
# → deploy-main (ngắn gọn hơn github.ref)
```

---

### `github.repository`
- Tên repository
- Format: `owner/repo`
- Ví dụ: `Trungdev1611/CICD_github-actions-workflows`

---

### `github.actor`
- Tên người trigger workflow
- Ví dụ: `trungdevnetko`

---

### `github.workflow`
- Tên workflow file
- Ví dụ: `self_hosted_local.yml`

---

## 💡 Recommendations cho workflow của bạn:

### Option 1: Giữ nguyên `github.ref` (Hiện tại)
```yaml
concurrency:
  group: self-hosted-deploy-${{ github.ref }}
```
✅ Hoạt động tốt, đầy đủ thông tin

### Option 2: Dùng `github.ref_name` (Ngắn gọn hơn)
```yaml
concurrency:
  group: self-hosted-deploy-${{ github.ref_name }}
```
✅ Group name ngắn gọn, dễ đọc hơn

---

## 📝 Tóm tắt:

### Về Docker build command:
- ✅ **Phải có dấu `.`** → Chỉ định build context (thư mục hiện tại)
- ✅ **Tag kép** → `latest` và `commit SHA` để track và rollback

### Về `github.ref`:
- ✅ **Full git ref** → `refs/heads/main`
- ✅ **Dùng trong concurrency** → Mỗi branch có group riêng
- ✅ **Linh hoạt** → Workflows từ branch khác không conflict

### Nếu muốn ngắn gọn:
- Có thể dùng `github.ref_name` → Chỉ lấy `main` thay vì `refs/heads/main`

