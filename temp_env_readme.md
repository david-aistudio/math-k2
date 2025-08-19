### Environment Variables
Buat file `.env.local`:

**Untuk satu API key:**
```env
VITE_OPENROUTER_API_KEY=your_single_api_key_here
```

**Untuk multiple API keys (comma separated):**
```env
VITE_OPENROUTER_API_KEY=sk-or-v1-key1,sk-or-v1-key2,sk-or-v1-key3
```

Jika menggunakan layanan gratisan dengan sistem route yang memberikan 8 API key, masukkan semua key dipisahkan dengan koma untuk rotasi otomatis.