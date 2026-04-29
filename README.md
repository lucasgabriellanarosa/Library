# 📚 Library
> A book discovery platform focused on performance, security, and accessibility.

[![](https://img.shields.io/badge/website-2EC866?&logo=About.me&logoColor=white)](https://lucasgabriellanarosa.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucas-rosa-452b59237/)
[![Medium](https://img.shields.io/badge/-Medium-%23000000?&logo=medium&logoColor=white)](https://medium.com/@seuusuario)
[![YouTube](https://img.shields.io/badge/YouTube-CC342D?&logo=youtube&logoColor=white)](#)


---

## 📝 About
This project was developed to provide a seamless book discovery experience using the **Open Library API**. Its key feature lies in the backend architecture, where I used **Supabase Edge Functions** as a proxy to optimize requests and ensure secure communications.

### 🎯 Key Features
- **🔒 Network Resilience:** Custom proxy designed to handle external API instability
- **♿ Accessibility:** Full keyboard navigation tested with Firefox Dev Edition
- **🎨 Responsive & Animated:** Stunning UI/UX with Framer Motion animations
- **⚡ Performance Optimized:** React Compiler integration for lightning-fast rendering
- **📱 Barcode Scanner:** Quagga integration for quick book lookup

---

## 📊 Project Structure
```
src/
├── @types/         # TypeScript type definitions
├── assets/         # Static assets (images, fonts, SVG icons)
├── components/     # Reusable React components
├── features/       # Feature-specific modules with logic and UI
├── hooks/          # Custom React hooks for state and side effects
├── lib/            # Third-party libraries and service integrations (Supabase, APIs)
├── pages/          # Route pages
├── stores/         # Zustand state management
└── utils/          # Helper functions
```

## 🛠️ Tech Stack

### Frontend
[![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](#)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](#)

### Backend & APIs
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=fff)](#)
[![OpenLibrary](https://img.shields.io/badge/OpenLibrary%20API-0B5394?style=for-the-badge&logo=books&logoColor=white)](#)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini%20API-8E75B2?style=for-the-badge&logo=google&logoColor=white)](#)

### Tools & Libraries
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](#)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge)](#)
[![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=fff)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=fff)](#)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](#)

### **Detailed Stack Breakdown**

**Frontend:**
- **React** - Foundation with React Compiler for performance optimization
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Tailwind CSS** - Utility-first CSS for rapid, maintainable styling
- **React Router 7** - Client-side routing and navigation
- **Framer Motion** - Smooth animations and interactions

**Backend & Services:**
- **Supabase** - BaaS platform with:
  - Authentication management
  - PostgreSQL database
  - Edge Functions (Deno runtime) as serverless proxy layer
- **Open Library API** - Source of bibliographic data
- **Google Generative AI (Gemini)** - AI-powered features and data processing

**Additional Libraries:**
- **Zustand** - Lightweight global state management
- **Axios** - HTTP client for API communication
- **Quagga2** - Barcode/ISBN scanning
- **React Spinners & React Icons** - UI components and feedback

---

### Installation
```bash
# Clone the repository
git clone https://github.com/seu-usuario/seu-projeto

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

**📋 Environment Variables**

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_API_PROXY=your_edge_function_url
```

---

## 🎨 Features in Detail

### Smart Book Discovery
- Search across millions of books from Open Library
- AI-powered book informations using Gemini API
- Barcode scanning for instant book lookup

### Performance Optimized
- React Compiler for automatic optimization
- Edge Functions for reduced latency
- Lazy loading and code splitting

### Security First
- Supabase Edge Functions proxy layer
- Secure API key management
- Protected user authentication

### Accessible Experience
- WCAG compliant keyboard navigation
- Screen reader optimized
- High contrast support
