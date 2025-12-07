# Test Checklist cho Dự án React CI/CD

## 📋 Tổng quan

Checklist này chia test cases theo:
- **P0 (Critical)**: Phải có, ảnh hưởng core functionality
- **P1 (High)**: Quan trọng, ảnh hưởng user experience
- **P2 (Medium)**: Nên có, cải thiện quality
- **P3 (Low)**: Nice to have, edge cases

---

## 🧪 1. Component Tests

### 1.1 Counter Component ✅ (Đã có, cần cải thiện)

#### P0 - Critical Tests
- [x] ✅ Renders với count ban đầu = 0
- [x] ✅ Click Increase button → count tăng lên 1
- [x] ✅ Click Decrease button → count giảm xuống -1

#### P1 - High Priority Tests
- [ ] Click Increase nhiều lần → count tăng đúng
- [ ] Click Decrease nhiều lần → count giảm đúng
- [ ] Click Increase rồi Decrease → count về đúng giá trị
- [ ] Component có đúng data-testid="count-value"

#### P2 - Medium Priority Tests
- [ ] Counter hiển thị đúng format "Count: X"
- [ ] Buttons có text đúng ("Increase", "Decrease")
- [ ] Component không crash khi click nhanh nhiều lần

#### P3 - Low Priority Tests
- [ ] Component có thể reset về 0 (nếu thêm feature)
- [ ] Accessibility: buttons có aria-label

---

### 1.2 UsersList Component ❌ (Chưa có test)

#### P0 - Critical Tests
- [ ] Component render thành công
- [ ] Hiển thị loading state khi fetch data
- [ ] Fetch và hiển thị danh sách users thành công
- [ ] Hiển thị error state khi API fail

#### P1 - High Priority Tests
- [ ] Mock API call và verify URL đúng
- [ ] Hiển thị đúng số lượng user cards
- [ ] Mỗi user card hiển thị đầy đủ thông tin:
  - [ ] User name
  - [ ] Username
  - [ ] Email (có thể click)
  - [ ] Phone (có thể click)
  - [ ] Website (có thể click)
- [ ] User ID badge hiển thị đúng
- [ ] Loading spinner hiển thị khi loading
- [ ] Error message hiển thị khi có lỗi

#### P2 - Medium Priority Tests
- [ ] API URL từ environment variable hoạt động đúng
- [ ] Fallback về JSONPlaceholder khi không có env var
- [ ] Badge "JSONPlaceholder API" chỉ hiển thị khi dùng JSONPlaceholder
- [ ] Grid layout render đúng
- [ ] User cards có đúng className
- [ ] Email link có format `mailto:`
- [ ] Phone link có format `tel:`
- [ ] Website link có format `https://` và mở trong tab mới

#### P3 - Low Priority Tests
- [ ] Component re-fetch khi API_URL thay đổi
- [ ] Error state hiển thị API URL
- [ ] Loading text hiển thị đúng
- [ ] Empty state (nếu API trả về array rỗng)
- [ ] Responsive design (mobile/tablet/desktop)

---

### 1.3 App Component ❌ (Cần cải thiện)

#### P0 - Critical Tests
- [x] ✅ Component render không crash
- [ ] Render tất cả child components:
  - [ ] Header với title
  - [ ] Counter component
  - [ ] UsersList component

#### P1 - High Priority Tests
- [ ] Header hiển thị đúng title
- [ ] Header hiển thị đúng subtitle
- [ ] Layout structure đúng (header, sections)

#### P2 - Medium Priority Tests
- [ ] Styling applied đúng
- [ ] Components không conflict với nhau

---

## 🔧 2. Integration Tests

### P1 - High Priority
- [ ] App render cả Counter và UsersList cùng lúc
- [ ] Counter và UsersList hoạt động độc lập
- [ ] Environment variables load đúng trong build

---

## 🌐 3. API Tests

### P0 - Critical Tests
- [ ] Mock fetch API và test success case
- [ ] Mock fetch API và test error case (network error)
- [ ] Mock fetch API và test error case (404, 500)

### P1 - High Priority Tests
- [ ] Verify API URL được construct đúng
- [ ] Verify API call chỉ được gọi 1 lần khi mount
- [ ] Verify API call không được gọi lại khi không cần

### P2 - Medium Priority Tests
- [ ] Test với different API URLs
- [ ] Test với invalid API response format
- [ ] Test với empty API response

---

## 🎨 4. UI/UX Tests

### P1 - High Priority Tests
- [ ] UsersList hiển thị badge khi dùng JSONPlaceholder
- [ ] User cards có hover effect
- [ ] Loading state có spinner animation
- [ ] Error state có styling rõ ràng

### P2 - Medium Priority Tests
- [ ] Grid layout responsive
- [ ] Cards có đúng spacing
- [ ] Links có đúng color/styling

---

## 🔐 5. Environment Variable Tests

### P0 - Critical Tests
- [ ] Component dùng VITE_API_URL từ env nếu có
- [ ] Component fallback về JSONPlaceholder nếu không có env

### P1 - High Priority Tests
- [ ] Test với VITE_API_URL set
- [ ] Test với VITE_API_URL không set
- [ ] Test với VITE_API_URL là empty string

---

## 🚀 6. Build & Deployment Tests

### P0 - Critical Tests (Trong CI/CD)
- [ ] Build thành công với production env
- [ ] Build output có đúng structure
- [ ] Environment variables được inject đúng khi build

### P1 - High Priority Tests
- [ ] Build không fail khi không có env vars
- [ ] Build output có thể deploy được

---

## 📝 7. Type Safety Tests

### P1 - High Priority Tests
- [ ] TypeScript compile không có errors
- [ ] Type definitions đúng cho User interface
- [ ] Props types đúng

---

## ♿ 8. Accessibility Tests

### P2 - Medium Priority Tests
- [ ] Links có aria-labels
- [ ] Buttons có đúng roles
- [ ] Semantic HTML elements được dùng đúng
- [ ] Keyboard navigation hoạt động

---

## 🧹 9. Code Quality Tests

### P2 - Medium Priority Tests
- [ ] ESLint không có errors
- [ ] Code coverage > 70% (recommended)
- [ ] No console errors trong test

---

## 📊 Test Coverage Goals

### Minimum Coverage (P0 + P1)
- Counter Component: **100%** ✅
- UsersList Component: **80%** ❌ (0% hiện tại)
- App Component: **60%** ❌ (~10% hiện tại)

### Recommended Coverage (P0 + P1 + P2)
- Counter Component: **100%**
- UsersList Component: **90%**
- App Component: **80%**

---

## 🎯 Test Priority Matrix

| Component | P0 Tests | P1 Tests | P2 Tests | Total | Status |
|-----------|----------|----------|----------|-------|--------|
| Counter | 3 | 4 | 3 | 10 | ✅ 3/10 (30%) |
| UsersList | 4 | 8 | 6 | 18 | ❌ 0/18 (0%) |
| App | 2 | 3 | 2 | 7 | ❌ 1/7 (14%) |
| Integration | 0 | 3 | 0 | 3 | ❌ 0/3 (0%) |
| API | 3 | 3 | 3 | 9 | ❌ 0/9 (0%) |
| **TOTAL** | **12** | **21** | **14** | **47** | **4/47 (8.5%)** |

---

## ✅ Recommended Test Implementation Order

### Phase 1: Critical Tests (P0) - 1-2 days
1. ✅ Counter P0 tests (đã có)
2. ❌ UsersList P0 tests (cần viết)
3. ❌ App P0 tests (cần cải thiện)
4. ❌ API P0 tests (cần viết)

### Phase 2: High Priority Tests (P1) - 2-3 days
5. ❌ Counter P1 tests
6. ❌ UsersList P1 tests
7. ❌ App P1 tests
8. ❌ Integration tests
9. ❌ API P1 tests

### Phase 3: Medium Priority Tests (P2) - 2-3 days
10. ❌ UsersList P2 tests
11. ❌ Environment variable tests
12. ❌ UI/UX tests

### Phase 4: Nice to Have (P3) - Optional
13. ❌ Accessibility tests
14. ❌ Edge cases

---

## 🛠️ Testing Tools & Setup

### Current Setup ✅
- Jest
- React Testing Library
- @testing-library/jest-dom
- ts-jest

### Recommended Additions
- [ ] MSW (Mock Service Worker) - Mock API calls
- [ ] @testing-library/user-event - Better user interactions
- [ ] jest-environment-jsdom - Already have ✅

---

## 📚 Example Test Structure

```typescript
// UsersList.test.tsx
describe('UsersList Component', () => {
  describe('P0 - Critical Tests', () => {
    it('should render successfully', () => {});
    it('should show loading state', () => {});
    it('should fetch and display users', () => {});
    it('should show error state on API failure', () => {});
  });

  describe('P1 - High Priority Tests', () => {
    it('should display correct number of user cards', () => {});
    it('should display all user information', () => {});
    // ...
  });
});
```

---

## 🎯 Quick Win Checklist

Nếu chỉ có 1-2 giờ, tập trung vào:

1. ✅ **UsersList P0 tests** (4 tests)
   - Render
   - Loading state
   - Success state
   - Error state

2. ✅ **Counter P1 tests** (4 tests)
   - Multiple clicks
   - Negative numbers

3. ✅ **App integration test** (1 test)
   - Render all components

**Total: ~9 tests trong 1-2 giờ** → Coverage tăng từ 8.5% → ~40%

---

## 📝 Notes

- Focus vào **behavior** chứ không phải implementation details
- Test **user interactions** thay vì internal state
- Use **MSW** để mock API thay vì mock fetch trực tiếp
- Keep tests **simple và readable**
- Write tests **before hoặc after** writing code (TDD hoặc after)

---

## 🔗 Resources

- [React Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [MSW Documentation](https://mswjs.io/)
- [Jest Documentation](https://jestjs.io/)

