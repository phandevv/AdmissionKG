# Frontend Service Rules (React JS - Nested / Feature Modules)

Bộ quy tắc tiêu chuẩn dành cho việc phát triển **Frontend Service** theo kiến trúc **Feature Modules (Nested)** trong dự án AdmissionKG.

---

## 📋 1. Công nghệ & Thư viện sử dụng
- **Core**: React JS 18 (Vite build tool)
- **Graph Visualization**: `cytoscape`, `react-cytoscapejs`
- **HTTP Client**: `axios`
- **Routing**: `react-router-dom`
- **Icons**: `lucide-react`
- **Styling**: Vanilla CSS / Modern CSS tokens (`index.css`)

---

## 📐 2. Cấu trúc Thư mục chuẩn theo Feature Modules
```text
frontend/src/
├── modules/
│   ├── admin/                            # Module Quản trị Nạp Tri thức
│   │   └── pages/AdminIngestPage.jsx
│   ├── chat/                             # Module Hỏi đáp Graph RAG & Đồ thị
│   │   ├── components/CytoscapeViewer.jsx
│   │   └── pages/UserChatPage.jsx
│   └── shared/                           # Shared Components & Services
│       ├── components/Navbar.jsx
│       └── services/api.js
├── App.jsx                               # Root App Routing
├── main.jsx                              # Entrypoint
└── index.css                             # Global Styles
```

---

## 🎨 3. Nguyên tắc Thiết kế & UI/UX
1. **Trực quan hóa Knowledge Graph**: Sử dụng Cytoscape.js với tô màu phân loại Node (Đỏ - Trường, Xanh lá - Ngành, Vàng - Phương thức/Tổ hợp, Xanh dương - Môn học).
2. **Split-Screen Dashboard**: Màn hình chat hiển thị song song Cột trái (Messenger Chat + 3 thẻ màu TAO Decision) và Cột phải (Đồ thị Cytoscape.js tương tác).
