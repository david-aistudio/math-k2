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

  // API Keys Rotation - ambil dari environment variables atau fallback ke demo keys
  API_KEYS: (() => {
    const envKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (envKey) {
      console.log('Using API keys from environment');
      return envKey.split(',').map(key => key.trim());
    }
    // Fallback ke demo keys jika tidak ada env key
    console.log('Using hardcoded demo keys');
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
  })(),

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
