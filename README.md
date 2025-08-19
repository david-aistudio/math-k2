# 🧠 Math K-2 - AI Matematika Profesional

Asisten matematika AI yang menyelesaikan soal dari tingkat SD hingga Universitas dengan penjelasan langkah demi langkah yang detail dan mudah dipahami.

## ✨ Fitur Utama

### 🎯 Kemampuan AI yang Cerdas
- **Aritmatika**: Operasi dasar, urutan operasi, pangkat, akar
- **Aljabar**: Persamaan linear, kuadrat, variabel
- **Trigonometri**: Sin, cos, tan dengan konversi derajat ke radian
- **Kalkulus**: Turunan, integral, limit
- **Geometri**: Luas, keliling, volume
- **Fisika**: Vektor, gaya, resultan, komponen

### 📸 Analisis Gambar
- Upload foto soal matematika
- OCR untuk membaca tulisan tangan
- Analisis dengan AI Vision
- Solusi step-by-step dari gambar

### 💬 Chat Natural
- Respons yang sopan dan profesional
- Deteksi otomatis jenis input
- Penjelasan yang mudah dipahami
- Interface yang user-friendly

## 🚀 Cara Penggunaan

### 1. Soal Matematika Sederhana
```
Input: "Hitung 15 + 27 × 3"
Output: Langkah-langkah detail dengan hasil 96
```

### 2. Soal Aljabar
```
Input: "Selesaikan persamaan: 2x + 5 = 13"
Output: x = 4 dengan penjelasan step-by-step
```

### 3. Soal Trigonometri
```
Input: "Hitung sin(30°) + cos(60°)"
Output: 1 dengan konversi derajat ke radian
```

### 4. Soal Kalkulus
```
Input: "Turunan dari f(x) = x³ + 2x² - 5x + 1"
Output: f'(x) = 3x² + 4x - 5 dengan aturan turunan
```

### 5. Soal Fisika
```
Input: "Sebuah gaya 50 N membentuk sudut 30° dengan sumbu x"
Output: Fx = 43.30 N, Fy = 25 N dengan komponen vektor
```

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component Library
- **React Router** - Navigation
- **React Helmet** - SEO Management

### AI & Matematika
- **OpenRouter API** - AI Provider
- **MathJS** - Mathematical Engine
- **KaTeX** - LaTeX Rendering
- **Claude 3.5 Sonnet** - Vision Analysis

### Development
- **Vite** - Build Tool
- **ESLint** - Code Quality
- **Prettier** - Code Formatting

## 📁 Struktur Proyek

```
src/
├── components/          # React Components
│   ├── ChatInput.tsx   # Input component
│   ├── ChatMessage.tsx # Message display
│   ├── QuickActions.tsx # Action buttons
│   └── ui/             # Shadcn components
├── lib/                # Core Logic
│   ├── mathEngine.ts   # Original math engine
│   ├── enhancedMathEngine.ts # Enhanced AI engine
│   ├── advancedMathEngine.ts # Symbolic math
│   ├── promptConfig.ts # AI prompts
│   ├── aiConfig.ts     # API configuration
│   └── aiTest.ts       # Testing suite
├── pages/              # Page Components
│   ├── Index.tsx       # Main chat page
│   ├── About.tsx       # About page
│   └── NotFound.tsx    # 404 page
└── hooks/              # Custom Hooks
```

## 🔧 Instalasi & Setup

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation
```bash
# Clone repository
git clone <repository-url>
cd math-k2

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables
Buat file `.env.local`:
```env
VITE_OPENROUTER_API_KEY=your_api_key_here
```

## 🧪 Testing

### Run Test Suite
```typescript
import { AITestSuite } from './src/lib/aiTest';

// Run all tests
await AITestSuite.runAllTests();

// Run quick test
await AITestSuite.quickTest();

// Run specific category
await AITestSuite.runCategoryTests('algebra');
```

### Test Categories
- ✅ Aritmatika (15 test cases)
- ✅ Aljabar (10 test cases)
- ✅ Trigonometri (8 test cases)
- ✅ Kalkulus (6 test cases)
- ✅ Fisika (5 test cases)
- ✅ Geometri (3 test cases)
- ✅ Conversation (5 test cases)

## 📊 Performance

### API Configuration
- **Model**: moonshotai/kimi-k2:free
- **Temperature**: 0.1 (konsistensi)
- **Max Tokens**: 800
- **Timeout**: 30 detik
- **Retry**: 3x dengan exponential backoff

### Optimization
- ✅ API key rotation
- ✅ Response caching
- ✅ Input preprocessing
- ✅ Lazy loading
- ✅ Error handling

## 🎯 Perbaikan yang Dilakukan

### Sebelum (AI "Tolol")
- ❌ Deteksi soal tidak akurat
- ❌ Response tidak konsisten
- ❌ Error handling minimal
- ❌ Prompt sederhana
- ❌ User experience buruk

### Sesudah (AI Profesional)
- ✅ Deteksi 10+ pola matematika
- ✅ Response JSON terstruktur
- ✅ Error handling komprehensif
- ✅ Prompt profesional dan detail
- ✅ User experience smooth

## 🔍 Contoh Response

### Soal Matematika
```json
{
  "finalAnswer": "x = 4",
  "steps": [
    {
      "step": "2x + 5 = 13",
      "explanation": "Persamaan linear yang diberikan",
      "result": "2x + 5 = 13"
    },
    {
      "step": "2x = 13 - 5",
      "explanation": "Pindahkan konstanta ke ruas kanan",
      "result": "2x = 8"
    },
    {
      "step": "x = 8 ÷ 2",
      "explanation": "Bagi kedua ruas dengan koefisien x",
      "result": "x = 4"
    }
  ],
  "type": "algebra"
}
```

### Chat Biasa
```
Input: "Halo"
Output: "Halo! Saya adalah AI matematika yang siap membantu Anda menyelesaikan soal-soal matematika. Silakan tanyakan soal matematika apa saja!"
```

## 🚀 Deploy untuk Produksi

### Build Production
```bash
npm run build
```

### Deploy Options
1. **Vercel** - Deploy otomatis dengan GitHub
2. **Netlify** - Drag & drop folder dist/
3. **GitHub Pages** - Static hosting gratis
4. **Firebase Hosting** - Google Cloud hosting

### Deploy ke Vercel
1. Push code ke GitHub repository
2. Login ke [Vercel](https://vercel.com)
3. Klik "New Project"
4. Pilih repository Anda
5. Klik "Deploy"
6. Vercel akan secara otomatis mendeteksi pengaturan dan melakukan deploy

### Environment Variables di Vercel
Untuk production deployment di Vercel, tambahkan environment variables berikut di pengaturan proyek:
- `VITE_APP_TITLE` = "Math K-2 Demo"
- `VITE_APP_VERSION` = "1.0.0-demo"

### SEO Optimization
- ✅ Meta tags dinamis dengan React Helmet
- ✅ Sitemap.xml untuk index halaman
- ✅ robots.txt untuk crawler
- ✅ Structured data untuk rich snippets

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📝 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🆘 Support

Jika mengalami masalah:
1. Cek [Issues](../../issues)
2. Buat issue baru
3. Hubungi developer

---

**Status: ✅ PRODUCTION READY**

AI matematika siap digunakan dengan kualitas profesional! 🚀
