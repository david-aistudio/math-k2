// AI CONFIGURATION FOR OPTIMAL PERFORMANCE 🚀

export const AI_CONFIG = {
  // API Configuration
  API: {
    BASE_URL: 'https://openrouter.ai/api/v1/chat/completions',
    MODELS: {
      TEXT: 'moonshotai/kimi-k2:free',
      VISION: 'anthropic/claude-3.5-sonnet:beta'
    },
    SETTINGS: {
      TEMPERATURE: 0.1,
      MAX_TOKENS: 800,
      VISION_TEMPERATURE: 0.1,
      VISION_MAX_TOKENS: 800
    }
  },

  // API Keys Rotation - HARDCODED dengan API key yang bener
  API_KEYS: [
    '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'
  ],

  // Request Headers
  HEADERS: {
    'Content-Type': 'application/json',
    'HTTP-Referer': window.location.origin,
    'X-Title': 'Professional AI Math Solver'
  },

  // Timeout Settings
  TIMEOUT: {
    REQUEST: 30000, // 30 seconds
    RETRY_DELAY: 1000, // 1 second
    MAX_RETRIES: 3
  },

  // Error Messages
  ERRORS: {
    NETWORK: 'Maaf, terjadi masalah koneksi. Silakan coba lagi.',
    TIMEOUT: 'Permintaan terlalu lama. Silakan coba lagi.',
    INVALID_INPUT: 'Input tidak valid. Silakan masukkan soal matematika yang jelas.',
    API_ERROR: 'Terjadi kesalahan pada sistem. Silakan coba lagi.',
    PARSE_ERROR: 'Terjadi kesalahan dalam pemrosesan respons.',
    RATE_LIMIT: 'Terlalu banyak permintaan. Silakan tunggu sebentar.'
  },

  // Success Messages
  SUCCESS: {
    SOLVED: 'Soal berhasil diselesaikan!',
    ANALYZED: 'Gambar berhasil dianalisis!',
    PROCESSED: 'Input berhasil diproses!'
  },

  // Validation Rules
  VALIDATION: {
    MIN_INPUT_LENGTH: 1,
    MAX_INPUT_LENGTH: 1000,
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    MAX_IMAGE_SIZE: 10 * 1024 * 1024 // 10MB
  },

  // Performance Settings
  PERFORMANCE: {
    DEBOUNCE_DELAY: 300, // ms
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
    MAX_CACHE_SIZE: 100
  }
};

// Helper Functions
export const AIHelpers = {
  // Get next API key with rotation
  getNextApiKey(): string {
    const currentIndex = Math.floor(Math.random() * AI_CONFIG.API_KEYS.length);
    return AI_CONFIG.API_KEYS[currentIndex];
  },

  // Validate input
  validateInput(input: string): { isValid: boolean; error?: string } {
    if (!input || input.trim().length < AI_CONFIG.VALIDATION.MIN_INPUT_LENGTH) {
      return { isValid: false, error: AI_CONFIG.ERRORS.INVALID_INPUT };
    }
    
    if (input.length > AI_CONFIG.VALIDATION.MAX_INPUT_LENGTH) {
      return { isValid: false, error: 'Input terlalu panjang. Maksimal 1000 karakter.' };
    }
    
    return { isValid: true };
  },

  // Validate image file
  validateImageFile(file: File): { isValid: boolean; error?: string } {
    if (!AI_CONFIG.VALIDATION.ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { isValid: false, error: 'Format gambar tidak didukung. Gunakan JPEG, PNG, atau WebP.' };
    }
    
    if (file.size > AI_CONFIG.VALIDATION.MAX_IMAGE_SIZE) {
      return { isValid: false, error: 'Ukuran gambar terlalu besar. Maksimal 10MB.' };
    }
    
    return { isValid: true };
  },

  // Create request headers
  createHeaders(apiKey: string): HeadersInit {
    return {
      ...AI_CONFIG.HEADERS,
      'Authorization': `Bearer ${apiKey}`
    };
  },

  // Handle API errors
  handleApiError(status: number): string {
    switch (status) {
      case 400:
        return AI_CONFIG.ERRORS.INVALID_INPUT;
      case 401:
        return 'API key tidak valid. Silakan hubungi administrator.';
      case 403:
        return AI_CONFIG.ERRORS.RATE_LIMIT;
      case 429:
        return AI_CONFIG.ERRORS.RATE_LIMIT;
      case 500:
        return AI_CONFIG.ERRORS.API_ERROR;
      default:
        return AI_CONFIG.ERRORS.NETWORK;
    }
  },

  // Retry mechanism
  async retryRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries: number = AI_CONFIG.TIMEOUT.MAX_RETRIES
  ): Promise<T> {
    let lastError: Error;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;
        
        if (i < maxRetries - 1) {
          await new Promise(resolve => 
            setTimeout(resolve, AI_CONFIG.TIMEOUT.RETRY_DELAY * (i + 1))
          );
        }
      }
    }
    
    throw lastError!;
  }
};
