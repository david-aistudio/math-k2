// ENHANCED AI MATH ENGINE - PROFESSIONAL GRADE 🧠⚡
import { MathSolution, MathStep } from './mathEngine';

export class EnhancedMathEngine {
  // GET API KEYS FROM ENVIRONMENT OR USE DEMO KEYS
  private static getApiKeys(): string[] {
    // Check for VITE_OPENROUTER_API_KEY environment variable first
    const envKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (envKey) {
      // If single key provided, use it
      if (!envKey.includes(',')) {
        console.log('Using single API key from environment');
        return [envKey];
      }
      
      // If multiple keys provided (comma separated), use all
      console.log('Using multiple API keys from environment');
      return envKey.split(',').map(key => key.trim());
    }
    
    // Fallback to demo keys if no env key provided
    console.log('Using demo API keys');
    return [
      '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',
      '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',
      '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',
      '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',
      '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',
      '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',
      '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',
      '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'
    ];
  }

  private static currentKeyIndex = 0;

  // GET NEXT API KEY FOR ROTATION
  private static getNextApiKey(): string {
    const keys = this.getApiKeys();
    const key = keys[this.currentKeyIndex];
    this.currentKeyIndex = (this.currentKeyIndex + 1) % keys.length;
    return key;
  }

  // PROFESSIONAL AI MATH SOLVER
  public static async solve(input: string): Promise<MathSolution> {
    // Input validation
    if (!input || input.trim().length === 0) {
      return this.createErrorResponse('Silakan masukkan soal matematika yang ingin diselesaikan.');
    }

    // Pre-process input
    const processedInput = this.preprocessInput(input);
    
    // Determine if it's mathematical
    if (!this.isMathematicalInput(processedInput)) {
      return this.handleConversation(input);
    }

    // Try AI solving
    try {
      return await this.aiMathSolver(processedInput);
    } catch (error) {
      console.error('AI Math Solver Error:', error);
      return this.createErrorResponse('Maaf, terjadi kesalahan dalam pemrosesan. Silakan coba lagi.');
    }
  }

  // ENHANCED INPUT PREPROCESSING
  private static preprocessInput(input: string): string {
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

  // INTELLIGENT MATHEMATICAL INPUT DETECTION
  private static isMathematicalInput(input: string): boolean {
    const mathPatterns = [
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
    ];
    
    return mathPatterns.some(pattern => pattern.test(input));
  }

  // PROFESSIONAL AI MATH SOLVER
  private static async aiMathSolver(input: string): Promise<MathSolution> {
    const apiKey = this.getNextApiKey();
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Enhanced AI Math Solver'
      },
      body: JSON.stringify({
        model: 'moonshotai/kimi-k2:free',
        messages: [
          {
            role: 'system',
            content: `Anda adalah AI matematika tingkat tinggi yang profesional dan akurat.

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
4. WAJIB step-by-step: komponen → resultan → sudut`
          },
          {
            role: 'user',
            content: input
          }
        ],
        temperature: 0.1,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Enhanced response parsing
    return this.parseAIResponse(aiResponse, input);
  }

  // ENHANCED RESPONSE PARSING
  private static parseAIResponse(aiResponse: string, originalInput: string): MathSolution {
    try {
      // Try to extract JSON from response
      const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || 
                       aiResponse.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const cleanResponse = jsonMatch[1] || jsonMatch[0];
        const parsed = JSON.parse(cleanResponse);
        
        // Validate parsed response
        if (this.isValidMathSolution(parsed)) {
          return {
            originalExpression: originalInput,
            finalAnswer: parsed.finalAnswer,
            steps: parsed.steps,
            type: parsed.type || this.determineType(originalInput)
          };
        }
      }
      
      // If no valid JSON, treat as conversation
      return this.handleConversation(originalInput, aiResponse);
      
    } catch (error) {
      console.error('Response parsing error:', error);
      return this.createErrorResponse('Terjadi kesalahan dalam pemrosesan respons AI.');
    }
  }

  // VALIDATE MATH SOLUTION STRUCTURE
  private static isValidMathSolution(parsed: any): boolean {
    return parsed && 
           typeof parsed.finalAnswer === 'string' && 
           Array.isArray(parsed.steps) && 
           parsed.steps.length > 0 &&
           parsed.steps.every((step: any) => 
             step && 
             typeof step.step === 'string' && 
             typeof step.explanation === 'string'
           );
  }

  // DETERMINE PROBLEM TYPE
  private static determineType(input: string): MathSolution['type'] {
    if (/\b(derivative|turunan|d\/dx)\b/i.test(input)) return 'calculus';
    if (/\b(integral|∫|antiturunan)\b/i.test(input)) return 'calculus';
    if (/\b(sin|cos|tan|sec|csc|cot)\b/i.test(input)) return 'trigonometry';
    if (/\b(vektor|gaya|resultan|komponen|newton)\b/i.test(input)) return 'geometry';
    if (input.includes('=') && /[a-zA-Z]/.test(input)) return 'algebra';
    if (/[a-zA-Z]/.test(input)) return 'algebra';
    return 'arithmetic';
  }

  // HANDLE CONVERSATION INPUTS
  private static handleConversation(input: string, aiResponse?: string): MathSolution {
    const response = aiResponse || this.generateConversationResponse(input);
    
    return {
      originalExpression: input,
      finalAnswer: response,
      steps: [
        {
          step: input,
          explanation: 'Percakapan dengan AI'
        }
      ],
      type: 'conversation'
    };
  }

  // GENERATE CONVERSATION RESPONSES
  private static generateConversationResponse(input: string): string {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('halo') || lowerInput.includes('hai') || lowerInput.includes('hello')) {
      return 'Halo! Saya adalah AI matematika yang siap membantu Anda menyelesaikan soal-soal matematika. Silakan tanyakan soal matematika apa saja!';
    }
    
    if (lowerInput.includes('terima kasih') || lowerInput.includes('thanks')) {
      return 'Sama-sama! Senang bisa membantu. Jika ada soal matematika lain, silakan tanyakan saja.';
    }
    
    if (lowerInput.includes('bisa') || lowerInput.includes('mampu')) {
      return 'Ya, saya bisa membantu menyelesaikan berbagai jenis soal matematika seperti aritmatika, aljabar, trigonometri, kalkulus, geometri, dan fisika. Silakan coba!';
    }
    
    return 'Halo! Saya adalah AI matematika. Silakan tanyakan soal matematika yang ingin Anda selesaikan.';
  }

  // CREATE ERROR RESPONSE
  private static createErrorResponse(message: string): MathSolution {
    return {
      originalExpression: '',
      finalAnswer: message,
      steps: [
        {
          step: 'Error',
          explanation: 'Terjadi kesalahan dalam pemrosesan'
        }
      ],
      type: 'conversation'
    };
  }

  // GET PROFESSIONAL EXAMPLES
  public static getExamples(): string[] {
    return [
      "Hitung 15 + 27 × 3",
      "Berapa hasil dari 5² + √16?",
      "Selesaikan persamaan: 2x + 5 = 13",
      "Hitung sin(30°) + cos(60°)",
      "Turunan dari f(x) = x³ + 2x² - 5x + 1",
      "Integral dari ∫(3x² - 4x + 5)dx",
      "Sebuah gaya 50 N membentuk sudut 30° dengan sumbu x. Hitung komponen Fx dan Fy",
      "Berapa luas lingkaran dengan jari-jari 7 cm?"
    ];
  }
}