# Environment Variables Setup

## Biến môi trường được sử dụng

- `VITE_API_URL`: URL của API backend (default: https://jsonplaceholder.typicode.com)

## Local Development

Để set biến môi trường cho local development, tạo file `.env.local`:

```env
VITE_API_URL=https://jsonplaceholder.typicode.com
```

File `.env.local` sẽ được git ignore và không được commit lên repository.

## GitHub Actions Workflow

Biến môi trường được set trong `.github/workflows/test_and_buid_github_page.yml`:

```yaml
env:
  VITE_API_URL: https://jsonplaceholder.typicode.com
```

Để thay đổi API URL cho production, có thể:
1. Update trực tiếp trong workflow file
2. Hoặc sử dụng GitHub Secrets (recommended cho sensitive data)

## Sử dụng trong code

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com';
```

Lưu ý: Với Vite, chỉ các biến có prefix `VITE_` mới được expose cho client-side code.

