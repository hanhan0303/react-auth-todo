# 🚀 Modern Auth-Todo Web App

一個基於 **React** 與 **Vite** 開發的現代化個人任務管理系統。本專案不只是單純的客戶端（Client-side）待辦清單，而是透過 **ky** 串接後端 API 整合了**會員登入系統**，讓每位使用者都能擁有獨立、安全的雲端任務儲存空間。

前端介面採用 **Shadcn UI** 與 **Tailwind CSS** 打造，著重於結構化的表單體驗與即時的動態通知回饋。

## ✨ 專案亮點與核心功能 (Key Features)

- 🔐 **會員認證與獨立儲存：** 串接獨立開發的後端 API，完整實作註冊與登入流程。使用者登入後，系統會自動綁定並雲端同步該會員專屬的 Todo 列表。
- 📦 **API 模組化與封裝：** 捨棄傳統的 fetch/axios，選用現代化、輕量級的 **ky** 進行 HTTP 請求管理。透過 `ky.create` 進行全域配置（封裝 prefixUrl 與 credentials 機制，實現跨來源安全憑證管理），並將所有接口統一歸納於 `api.js`，達成高維護性的程式碼架構。
- 🎨 **Shadcn UI 與靈活表單：** 運用 FieldGroup 建立結構化的質感輸入區塊，並透過狀態（state）靈活切換「登入/註冊」模式，大幅提升元件複用率。
- 🔔 **動態視覺回饋：** 整合 Shadcn Toast 元件，在使用者登入、註冊時，即時跳出極具質感的動態反饋。
- ⚡ **Vite 高效開發：** 利用 Vite 的極速熱更新（HMR），優化前端構建效能。
- 📱 **響應式設計 (RWD)：** 使用 Tailwind CSS 純手工打造，完美適配手機、平板與桌機。
- ⌨️ **UX 體驗優化：** 支援 `Enter` 鍵快速送出、輸入防呆機制（自動過濾空白字元），以及直覺的狀態切換動效。

## 🛠️ 技術棧 (Tech Stack)

- **Frontend Core:** React 18+ (Functional Components)
  - `useState`: 系統核心狀態管理，包含：- **會員與全域狀態：** 控制登入狀態 (`isLoggedIn`)、讀取中狀態 (`isLoading`)、與登入/註冊表單模式切換 (`mode`)。- **資料防錯與回滾機制 (Data Rollback)：** 在編輯 Todo 時，同時維護 `newTitle` 與 `prevTitle`，確保在使用者取消編輯或後端更新失敗時，能安全回滾至前一次的正確資料狀態。- **表單與過濾器：** 處理受控元件輸入（`todoText`, `formData`）、動態錯誤提示 (`errorMessage`) 以及分頁過濾狀態 (`activeFilter`)。
  - `useEffect`:
    - 實作 **身份驗證持久化 (Auth Persistence)**：在 App 掛載時自動檢查 Cookie 憑證。
    - 處理 **全域事件監聽 (Global Event Listening)**：動態綁定與清除滑鼠點擊事件，實作點擊外部自動取消編輯的功能。
    - 建立 **排程器 (Timer Side-effects)**：實作時鐘元件並在元件卸載時正確清除 `setInterval`，防止記憶體洩漏 (Memory Leak)。
  - `useMemo`: 快取「全部 / 已完成 / 未完成」的 Todo 列表過濾邏輯，避免因其他狀態改變而引發重複的陣列運算。
  - `useCallback`: 記憶化 `handleCancelEdit` 函式，防止其因父元件 Re-render 而重新建立，並安全地作為 `useEffect` 的依賴項，避免引發無限渲染循環。
  - `useRef`: 用於綁定編輯中的 DOM 節點，實作精準的 **Click Outside（點擊外部偵測）** 互動邏輯。
- **Build Tool:** Vite
- **Data Fetching:** ky (HTTP client，模組化配置 prefixUrl 與 credentials)
- **Styling / UI:** Tailwind CSS + Shadcn UI (FieldGroup, Toast)
