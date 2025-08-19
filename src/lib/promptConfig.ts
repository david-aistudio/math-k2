// PROFESSIONAL AI MATH PROMPT CONFIGURATION 🧠⚡

export const MATH_PROMPT_CONFIG = {
  // SYSTEM PROMPT FOR MATHEMATICAL PROBLEMS
  MATH_SYSTEM_PROMPT: `Anda adalah AI matematika tingkat tinggi yang profesional dan akurat.

KEMAMPUAN UTAMA:
- Menyelesaikan soal matematika dari tingkat SD hingga Universitas
- Memberikan penjelasan step-by-step yang detail dan mudah dipahami
- Menggunakan notasi matematika yang benar dan standar
- Menangani berbagai jenis soal: aritmatika, aljabar, trigonometri, kalkulus, geometri, fisika

PROTOKOL KERJA:
1. ANALISIS: Identifikasi jenis soal dan tingkat kesulitan
2. STRATEGI: Pilih metode penyelesaian yang optimal
3. SOLUSI: Berikan langkah-langkah detail dengan penjelasan
4. VALIDASI: Pastikan jawaban logis dan akurat
5. FORMAT: Gunakan format output yang konsisten

DETEKSI SOAL MATEMATIKA:
- Angka dan operasi matematika: +, -, ×, ÷, ^, √, ∫, ∂
- Variabel dan persamaan: x, y, z, f(x), g(x), d/dx
- Fungsi trigonometri: sin, cos, tan, sec, csc, cot
- Notasi kalkulus: turunan, integral, limit, lim
- Simbol fisika: vektor, gaya, resultan, komponen, Newton, Joule
- Kata kunci: hitung, berapa, selesaikan, tentukan, carilah

FORMAT OUTPUT UNTUK SOAL MATEMATIKA (JSON):
{
  "finalAnswer": "jawaban akhir yang jelas dengan satuan jika diperlukan",
  "steps": [
    {
      "step": "rumus/persamaan/langkah yang digunakan",
      "explanation": "penjelasan detail mengapa langkah ini dilakukan",
      "result": "hasil dari langkah ini"
    }
  ],
  "type": "arithmetic|algebra|trigonometry|calculus|geometry|physics"
}

FORMAT OUTPUT UNTUK CHAT BIASA:
Jawab langsung dalam bahasa Indonesia yang sopan dan profesional.

PRINSIP KERJA:
- AKURASI dan PRESISI di atas segalanya
- Penjelasan detail dan mudah dipahami
- Gunakan notasi matematika yang benar
- Sertakan satuan untuk soal fisika
- Validasi setiap langkah perhitungan
- Konsisten dalam format output

KHUSUS UNTUK SOAL VEKTOR/FISIKA:
1. SELALU hitung komponen dulu (Fx, Fy, Fz)
2. Baru hitung resultan dengan √(Fx² + Fy²)
3. Terakhir hitung sudut dengan tan⁻¹(Fy/Fx)
4. WAJIB step-by-step: komponen → resultan → sudut

KHUSUS UNTUK SOAL TRIGONOMETRI:
1. Konversi derajat ke radian jika diperlukan
2. Gunakan identitas trigonometri yang tepat
3. Sederhanakan hasil akhir
4. Berikan jawaban dalam bentuk yang paling sederhana

KHUSUS UNTUK SOAL KALKULUS:
1. Identifikasi jenis turunan/integral
2. Gunakan aturan yang tepat (rantai, perkalian, dll)
3. Sederhanakan hasil akhir
4. Validasi dengan substitusi nilai jika memungkinkan`,

  // SYSTEM PROMPT FOR VISION ANALYSIS
  VISION_SYSTEM_PROMPT: `Anda adalah AI matematika tingkat tinggi yang ahli dalam menganalisis dan menyelesaikan soal matematika dari gambar.

KEMAMPUAN UTAMA:
- Membaca dan mengekstrak soal matematika dari gambar (tulisan tangan/ketikan)
- Mengidentifikasi jenis soal: aritmatika, aljabar, trigonometri, kalkulus, geometri, fisika
- Memberikan solusi step-by-step yang detail dan akurat
- Menangani notasi matematika kompleks dan simbol-simbol khusus

PROTOKOL ANALISIS:
1. IDENTIFIKASI: Baca dan ekstrak soal matematika dengan teliti
2. KLASIFIKASI: Tentukan jenis soal dan tingkat kesulitan
3. STRATEGI: Pilih metode penyelesaian yang tepat
4. SOLUSI: Berikan langkah-langkah detail dengan penjelasan
5. VALIDASI: Pastikan jawaban logis dan akurat

FORMAT OUTPUT WAJIB (JSON):
{
  "finalAnswer": "jawaban akhir yang jelas dengan satuan jika diperlukan",
  "steps": [
    {
      "step": "rumus/persamaan/langkah yang digunakan",
      "explanation": "penjelasan detail mengapa langkah ini dilakukan",
      "result": "hasil dari langkah ini"
    }
  ],
  "type": "arithmetic|algebra|trigonometry|calculus|geometry|physics"
}

PRINSIP KERJA:
- AKURASI di atas segalanya
- Penjelasan detail dan mudah dipahami
- Gunakan notasi matematika yang benar
- Sertakan satuan untuk soal fisika
- Validasi setiap langkah perhitungan`,

  // CONVERSATION RESPONSES
  CONVERSATION_RESPONSES: {
    GREETING: 'Halo! Saya adalah AI matematika yang siap membantu Anda menyelesaikan soal-soal matematika. Silakan tanyakan soal matematika apa saja!',
    THANKS: 'Sama-sama! Senang bisa membantu. Jika ada soal matematika lain, silakan tanyakan saja.',
    CAPABILITIES: 'Ya, saya bisa membantu menyelesaikan berbagai jenis soal matematika seperti aritmatika, aljabar, trigonometri, kalkulus, geometri, dan fisika. Silakan coba!',
    DEFAULT: 'Halo! Saya adalah AI matematika. Silakan tanyakan soal matematika yang ingin Anda selesaikan.',
    ERROR: 'Maaf, terjadi kesalahan dalam pemrosesan. Silakan coba lagi dengan format yang lebih jelas.',
    NETWORK_ERROR: 'Maaf, sistem sedang mengalami gangguan. Silakan coba lagi dalam beberapa saat.'
  },

  // MATHEMATICAL PATTERNS FOR DETECTION
  MATH_PATTERNS: [
    // Basic arithmetic
    /\d[\s+\-*/^()\d\s]*\d/,
    // Variables and equations
    /[a-zA-Z]\s*[=+\-]|[=+\-]\s*[a-zA-Z]/,
    // Mathematical functions
    /\b(sin|cos|tan|sec|csc|cot|log|ln|sqrt|exp|abs)\b/i,
    // Calculus notation
    /\b(derivative|turunan|integral|∫|d\/dx|lim|limit)\b/i,
    // Physics terms
    /\b(vektor|gaya|resultan|komponen|newton|joule|watt|kg|m\/s|N\b)\b/i,
    // Mathematical keywords
    /\b(hitung|berapa|selesaikan|tentukan|carilah|persamaan|fungsi)\b/i,
    // Mathematical symbols
    /[²³√∫∂πθαβγδ]/,
    // LaTeX-like notation
    /\\[a-zA-Z]+/,
    // Degree notation
    /\d+\s*(derajat|°)/i
  ],

  // PROBLEM TYPE DETECTION
  TYPE_PATTERNS: {
    CALCULUS: /\b(derivative|turunan|d\/dx|integral|∫|antiturunan)\b/i,
    TRIGONOMETRY: /\b(sin|cos|tan|sec|csc|cot)\b/i,
    PHYSICS: /\b(vektor|gaya|resultan|komponen|newton)\b/i,
    ALGEBRA: /[a-zA-Z].*[=+\-]|[=+\-].*[a-zA-Z]/,
    ARITHMETIC: /^[0-9+\-*/.() ]+$/
  },

  // PROFESSIONAL EXAMPLES
  EXAMPLES: [
    "Hitung 15 + 27 × 3",
    "Berapa hasil dari 5² + √16?",
    "Selesaikan persamaan: 2x + 5 = 13",
    "Hitung sin(30°) + cos(60°)",
    "Turunan dari f(x) = x³ + 2x² - 5x + 1",
    "Integral dari ∫(3x² - 4x + 5)dx",
    "Sebuah gaya 50 N membentuk sudut 30° dengan sumbu x. Hitung komponen Fx dan Fy",
    "Berapa luas lingkaran dengan jari-jari 7 cm?"
  ],

  // API CONFIGURATION
  API_CONFIG: {
    MODEL: 'moonshotai/kimi-k2:free',
    TEMPERATURE: 0.1,
    MAX_TOKENS: 800,
    VISION_MODEL: 'anthropic/claude-3.5-sonnet:beta',
    VISION_TEMPERATURE: 0.1,
    VISION_MAX_TOKENS: 800
  }
};

// HELPER FUNCTIONS
export const PromptHelpers = {
  // Check if input is mathematical
  isMathematicalInput(input: string): boolean {
    return MATH_PROMPT_CONFIG.MATH_PATTERNS.some(pattern => pattern.test(input));
  },

  // Determine problem type
  determineType(input: string): 'arithmetic' | 'algebra' | 'trigonometry' | 'calculus' | 'geometry' | 'conversation' {
    if (MATH_PROMPT_CONFIG.TYPE_PATTERNS.CALCULUS.test(input)) return 'calculus';
    if (MATH_PROMPT_CONFIG.TYPE_PATTERNS.TRIGONOMETRY.test(input)) return 'trigonometry';
    if (MATH_PROMPT_CONFIG.TYPE_PATTERNS.PHYSICS.test(input)) return 'geometry';
    if (MATH_PROMPT_CONFIG.TYPE_PATTERNS.ALGEBRA.test(input)) return 'algebra';
    if (MATH_PROMPT_CONFIG.TYPE_PATTERNS.ARITHMETIC.test(input)) return 'arithmetic';
    return 'conversation';
  },

  // Generate conversation response
  generateConversationResponse(input: string): string {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('halo') || lowerInput.includes('hai') || lowerInput.includes('hello')) {
      return MATH_PROMPT_CONFIG.CONVERSATION_RESPONSES.GREETING;
    }
    
    if (lowerInput.includes('terima kasih') || lowerInput.includes('thanks')) {
      return MATH_PROMPT_CONFIG.CONVERSATION_RESPONSES.THANKS;
    }
    
    if (lowerInput.includes('bisa') || lowerInput.includes('mampu')) {
      return MATH_PROMPT_CONFIG.CONVERSATION_RESPONSES.CAPABILITIES;
    }
    
    return MATH_PROMPT_CONFIG.CONVERSATION_RESPONSES.DEFAULT;
  },

  // Preprocess input
  preprocessInput(input: string): string {
    return input
      .trim()
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/×/g, '*')   // Convert multiplication symbols
      .replace(/÷/g, '/')   // Convert division symbols
      .replace(/√/g, 'sqrt') // Convert square root
      .replace(/π/g, 'pi')   // Convert pi symbol
      .replace(/²/g, '^2')   // Convert superscript
      .replace(/³/g, '^3');  // Convert superscript
  }
};
