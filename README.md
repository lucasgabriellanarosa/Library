# 📚 Delta Pearl Library
> A book discovery platform focused on performance, security, and accessibility.

**Live Deploy:** https://library-pearl-delta.vercel.app/

Article: [What Building a “Simple” Library App Taught Me About Frontend Engineering](https://medium.com/@lucasgabriellr.dev/what-building-a-simple-library-app-taught-me-about-frontend-engineering-8ad6065efa43)

Demo: https://youtu.be/8-XRBTv0-LA

![Delta Pearl Library](<public/hero.png>)

---

## 📝 About
This project was developed to provide a seamless book discovery experience using the **Open Library API**. Its key feature lies in the backend architecture, where I used **Supabase Edge Functions** as a proxy to optimize requests and ensure secure communications.

### ⚡ Highlights
- 🧱 **Edge-first architecture** with Supabase Functions acting as a proxy layer for external APIs
- ♿ **Accessibility-focused development** (keyboard navigation + ARIA + manual testing)
-⚡ **Performance optimization** using React Compiler, lazy loading, and code splitting
-📷 **Barcode scanning (ISBN)** via Quagga2 for real-world usability
-🧠 **AI integration** with Gemini for contextual book interactions
-📱 **Fully responsive** mobile-first UI

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
- **React Router** - Client-side routing and navigation
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