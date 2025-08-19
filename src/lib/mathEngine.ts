// AI-POWERED MATH ENGINE WITH OPENROUTER ⚡️
import { AdvancedMathEngine } from './advancedMathEngine';

export interface MathStep {
  step: string;
  explanation: string;
  result?: string;
}

export interface MathSolution {
  originalExpression: string;
  finalAnswer: string;
  steps: MathStep[];
  type: 'arithmetic' | 'algebra' | 'trigonometry' | 'calculus' | 'geometry' | 'conversation';
  imageUrl?: string; // For storing uploaded image URL
  hasVisualization?: boolean; // For graph/plot support
}

export class MathEngine {
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

  // AI VISION FOR IMAGE ANALYSIS 📸
  private static async aiVisionSolver(input: string, imageFile: File): Promise<MathSolution> {
    const apiKey = this.getNextApiKey();
    
    try {
      // Convert image to base64
      const imageBase64 = await this.fileToBase64(imageFile);
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Math Vision Solver'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet:beta',
          messages: [
            {
              role: 'system',
              content: `Anda adalah AI matematika tingkat tinggi yang ahli dalam menganalisis dan menyelesaikan soal matematika dari gambar.

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
- Validasi setiap langkah perhitungan`
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analisis gambar soal matematika ini dengan TELITI dan PROFESIONAL!

KONTEKS: ${input}

TUGAS:
1. Baca dan ekstrak soal matematika dari gambar
2. Identifikasi jenis soal dan tingkat kesulitan
3. Berikan solusi step-by-step yang detail
4. Pastikan jawaban akurat dan logis

FORMAT JAWABAN WAJIB JSON dengan struktur yang benar!`
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageBase64
                  }
                }
              ]
            }
          ],
          temperature: 0.1,
          max_tokens: 800
        })
      });

      if (!response.ok) {
        throw new Error(`Vision API Error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content;

      if (!aiResponse) {
        throw new Error('No vision response from AI');
      }

      // Parse JSON response dengan error handling yang lebih robust
      const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || 
                       aiResponse.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const cleanResponse = jsonMatch[1] || jsonMatch[0];
        const parsed = JSON.parse(cleanResponse);
        
        return {
          originalExpression: input,
          finalAnswer: parsed.finalAnswer || 'Tidak dapat membaca soal dari gambar',
          steps: parsed.steps || [{ 
            step: 'Analisis gambar', 
            explanation: 'Menganalisis soal matematika dari gambar yang dikirim' 
          }],
          type: parsed.type || 'arithmetic',
          imageUrl: URL.createObjectURL(imageFile)
        };
      } else {
        // Fallback jika JSON parsing gagal
        return {
          originalExpression: input,
          finalAnswer: aiResponse,
          steps: [
            {
              step: 'Analisis gambar',
              explanation: 'AI menganalisis gambar yang dikirim'
            }
          ],
          type: 'conversation',
          imageUrl: URL.createObjectURL(imageFile)
        };
      }
    } catch (error) {
      console.error('AI Vision Error:', error);
      
      return {
        originalExpression: input,
        finalAnswer: 'Maaf, tidak bisa membaca gambar. Pastikan gambar jelas dan berisi soal matematika.',
        steps: [
          {
            step: 'Error analisis gambar',
            explanation: 'Terjadi kesalahan saat menganalisis gambar. Coba upload ulang dengan gambar yang lebih jelas.'
          }
        ],
        type: 'conversation',
        imageUrl: URL.createObjectURL(imageFile)
      };
    }
  }

  // HELPER: Convert File to Base64
  private static fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // AI-POWERED MATH SOLVER USING OPENROUTER
  private static async aiMathSolver(input: string): Promise<MathSolution> {
    const apiKey = this.getNextApiKey();
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Math Solver'
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
- Konsisten dalam format output`
            },
            {
              role: 'user',
              content: input
            }
          ],
          temperature: 0.1,
          max_tokens: 600
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('OpenRouter API Response:', data);
      
      const aiResponse = data.choices?.[0]?.message?.content;
      console.log('AI Response Content:', aiResponse);

      if (!aiResponse) {
        console.error('No AI response received:', data);
        throw new Error('No response from AI');
      }

      // Enhanced response handling dengan validasi yang lebih robust
      try {
        // Check if response contains JSON (math problem)
        const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/) || 
                         aiResponse.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          // It's a math solution
          const cleanResponse = jsonMatch[1] || jsonMatch[0];
          console.log('Parsing math JSON:', cleanResponse);
          
          const parsed = JSON.parse(cleanResponse);
          
          // Validate parsed response
          if (!parsed.finalAnswer || !parsed.steps || !Array.isArray(parsed.steps)) {
            throw new Error('Invalid JSON structure');
          }
          
          return {
            originalExpression: input,
            finalAnswer: parsed.finalAnswer,
            steps: parsed.steps,
            type: parsed.type || this.determineTypeFromInput(input)
          };
        } else {
          // It's a casual conversation
          console.log('Handling as conversation');
          return {
            originalExpression: input,
            finalAnswer: aiResponse,
            steps: [
              {
                step: input,
                explanation: 'Percakapan dengan AI'
              }
            ],
            type: 'conversation'
          };
        }
      } catch (parseError) {
        console.error('Response handling failed:', parseError);
        
        // Enhanced fallback dengan analisis input
        if (this.isMathematicalInput(input)) {
          return {
            originalExpression: input,
            finalAnswer: 'Maaf, terjadi kesalahan dalam pemrosesan soal matematika. Silakan coba lagi dengan format yang lebih jelas.',
            steps: [
              {
                step: input,
                explanation: 'Input terdeteksi sebagai soal matematika tetapi terjadi kesalahan dalam pemrosesan'
              }
            ],
            type: this.determineTypeFromInput(input)
          };
        } else {
          // Fallback untuk chat biasa
          return {
            originalExpression: input,
            finalAnswer: aiResponse,
            steps: [
              {
                step: input,
                explanation: 'Chat dengan AI'
              }
            ],
            type: 'conversation'
          };
        }
      }
    } catch (error) {
      console.error('AI Math Solver Error:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : error,
        apiKey: apiKey.substring(0, 20) + '...'
      });
      
      // Enhanced fallback dengan analisis input
      if (this.isMathematicalInput(input)) {
        return {
          originalExpression: input,
          finalAnswer: 'Maaf, sistem sedang mengalami gangguan. Silakan coba lagi dalam beberapa saat.',
          steps: [
            {
              step: input,
              explanation: 'Terjadi kesalahan koneksi ke AI untuk soal matematika'
            }
          ],
          type: this.determineTypeFromInput(input)
        };
      } else {
        return {
          originalExpression: input,
          finalAnswer: 'Maaf, saya sedang mengalami gangguan. Coba lagi sebentar!',
          steps: [
            {
              step: input,
              explanation: 'Ada masalah koneksi ke AI. Silakan coba lagi.'
            }
          ],
          type: 'conversation'
        };
      }
    }
  }

  // Enhanced mathematical input detection
  private static isMathematicalInput(input: string): boolean {
    const mathPatterns = [
      // Numbers and basic operations
      /\d[\s+\-*/^()\d\s]*\d/,
      // Variables and equations
      /[a-zA-Z]\s*[=+\-]|[=+\-]\s*[a-zA-Z]/,
      // Mathematical functions
      /\b(sin|cos|tan|sec|csc|cot|log|ln|sqrt|exp)\b/i,
      // Calculus notation
      /\b(derivative|turunan|integral|∫|d\/dx|lim|limit)\b/i,
      // Physics terms
      /\b(vektor|gaya|resultan|komponen|newton|joule|watt|kg|m\/s)\b/i,
      // Mathematical keywords
      /\b(hitung|berapa|selesaikan|tentukan|carilah|persamaan|fungsi)\b/i,
      // Mathematical symbols
      /[²³√∫∂πθαβγδ]/,
      // LaTeX-like notation
      /\\[a-zA-Z]+/
    ];
    
    return mathPatterns.some(pattern => pattern.test(input));
  }

  // Enhanced type determination
  private static determineTypeFromInput(input: string): MathSolution['type'] {
    if (/\b(derivative|turunan|d\/dx)\b/i.test(input)) return 'calculus';
    if (/\b(integral|∫|antiturunan)\b/i.test(input)) return 'calculus';
    if (/\b(sin|cos|tan|sec|csc|cot)\b/i.test(input)) return 'trigonometry';
    if (/\b(vektor|gaya|resultan|komponen|newton)\b/i.test(input)) return 'geometry';
    if (input.includes('=') && /[a-zA-Z]/.test(input)) return 'algebra';
    if (/[a-zA-Z]/.test(input)) return 'algebra';
    return 'arithmetic';
  }

  // MAIN SOLVE METHOD - AI POWERED ⚡ WITH ADVANCED MATH SUPPORT 📸🧮
  public static async solve(input: string, imageFile?: File): Promise<MathSolution> {
    // Validate input
    if (!input || input.trim().length === 0) {
      return {
        originalExpression: input,
        finalAnswer: 'Silakan masukkan soal matematika yang ingin diselesaikan.',
        steps: [{
          step: 'Input kosong',
          explanation: 'Tidak ada input yang diberikan'
        }],
        type: 'conversation'
      };
    }

    // If image is provided, use vision analysis
    if (imageFile) {
      console.log('🔍 Analyzing image with AI Vision...');
      return await this.aiVisionSolver(input, imageFile);
    }

    // Try advanced symbolic math first for complex expressions
    if (this.isAdvancedMath(input)) {
      try {
        const advancedResult = AdvancedMathEngine.solveSymbolic(input);
        console.log('🧮 Using advanced symbolic math engine');
        return {
          ...advancedResult,
          hasVisualization: this.shouldVisualize(input)
        };
      } catch (error) {
        console.log('Advanced math failed, falling back to AI');
      }
    }

    // Quick check for simple arithmetic
    const simplePattern = /^[0-9+\-*/.() ]+$/;
    if (simplePattern.test(input.replace(/\s/g, ''))) {
      try {
        const result = Function('"use strict"; return (' + input.replace(/\s/g, '') + ')')();
        return {
          originalExpression: input,
          finalAnswer: result.toString(),
          steps: [
            {
              step: input,
              explanation: 'Soal yang diberikan'
            },
            {
              step: `= ${result}`,
              explanation: 'Hasil perhitungan',
              result: result.toString()
            }
          ],
          type: 'arithmetic'
        };
      } catch {
        // If simple math fails, use AI
        return await this.aiMathSolver(input);
      }
    }

    // For everything else, use AI
    const aiResult = await this.aiMathSolver(input);
    return {
      ...aiResult,
      hasVisualization: this.shouldVisualize(input)
    };
  }

  // 🧠 ENHANCED PATTERN DETECTION - Deteksi SEMUA jenis soal matematika
  private static isAdvancedMath(input: string): boolean {
    // ALWAYS use advanced engine for equations with variables
    if (/[a-zA-Z]\s*[=+\-]|[=+\-]\s*[a-zA-Z]/.test(input)) {
      console.log('🎯 Detected equation with variables, using advanced engine');
      return true;
    }

    // ALWAYS use advanced engine if contains "berapa x" or similar variable questions
    if (/berapa\s+[a-zA-Z]|[a-zA-Z]\s*\?/.test(input)) {
      console.log('🎯 Detected variable question, using advanced engine');
      return true;
    }

    const advancedPatterns = [
      /\b(derivative|turunan|d\/dx)\b/i,
      /\b(integral|∫|antiturunan)\b/i,
      /\^[2-9]|\*\*[2-9]/, // Higher powers
      /\b(sin|cos|tan|sec|csc|cot|asin|acos|atan|log|ln|sqrt)\b/i, // All trig functions
      /[α-ωΑ-Ω]/, // Greek letters
      /\\[a-zA-Z]+/, // LaTeX commands
      /derajat|°/i, // Degree symbols
      /\b(vektor|gaya|resultan|komponen|newton|N\b|joule|watt|kg|m\/s)\b/i, // Physics terms
      /\+.*sin|cos.*\+|sin.*cos/, // Multiple trig functions
      /f\(x\)\s*=/i, // Function definitions
      /[a-z]\^[0-9]/i, // Variables with powers
      /\b(limit|lim)\b/i, // Calculus limits
      /\b(matrix|determinan|eigen)\b/i, // Linear algebra
      /\b(probabilitas|permutasi|kombinasi)\b/i, // Statistics
      /\b(geometri|lingkaran|segitiga|persegi)\b/i, // Geometry
    ];
    
    // If contains complex mathematical expressions, use advanced engine
    const hasComplexMath = advancedPatterns.some(pattern => pattern.test(input));
    
    // Also check if it's more than simple arithmetic
    const isSimpleArithmetic = /^[0-9+\-*/.() ]+$/.test(input.replace(/\s/g, ''));
    
    return hasComplexMath || !isSimpleArithmetic;
  }

  // Check if expression should be visualized
  private static shouldVisualize(input: string): boolean {
    return input.includes('x') && 
           !input.includes('berapa') && 
           !input.includes('hitung') &&
           (input.includes('=') || /\b(sin|cos|tan|x\^|x\*)\b/i.test(input));
  }

  // Get helpful examples in Indonesian focusing on mathematics
  public static getExamples(): string[] {
    return [
      "berapa 1 + 1?",
      "hitung 2 × 3", 
      "5^2 berapa?",
      "x^2 - 5x + 6 = 0",
      "sin(30 derajat)",
      "berapa (15 + 25) ÷ 2?",
      "∫₀^2 (3x² - 4x + 5) dx",
      "turunan dari x^3 + 2x^2"
    ];
  }
}