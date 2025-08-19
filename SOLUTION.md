# SOLUSI UNTUK MASALAH API KEY OPENROUTER DI VERCEL

## MASALAH YANG TERJADI:
1. API keys di-hardcode di `src/lib/aiConfig.ts` 
2. Environment variables dengan prefix `VITE_` gak kedetect otomatis di Vercel
3. Format API keys di env vars harus dipisah dengan koma tanpa spasi

## SOLUSI YANG DIREKOMENDASIKAN:

### Opsi 1: Pakai Environment Variables dengan Build-time Injection (REKOMENDASI)

1. **Di Vercel Dashboard**:
   - Masuk ke project settings → Environment Variables
   - Tambahkan variable baru:
     ```
     Name: VITE_OPENROUTER_API_KEY
     Value: sk-or-v1-key1,sk-or-v1-key2,sk-or-v1-key3,sk-or-v1-key4,sk-or-v1-key5,sk-or-v1-key6,sk-or-v1-key7,sk-or-v1-key8
     ```
   - Pastikan TIDAK ADA SPASI sesudah koma

2. **Update `src/lib/aiConfig.ts`**:
   Hapus bagian API_KEYS hardcoded dan ganti dengan:
   ```javascript
   // API Keys Rotation - ambil dari environment variables
   API_KEYS: (() => {
     const envKey = import.meta.env.VITE_OPENROUTER_API_KEY;
     if (envKey) {
       return envKey.split(',').map(key => key.trim());
     }
     // Fallback ke demo keys jika tidak ada env key
     return [
       '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',
       // ... (7 keys lainnya)
     ];
   })(),
   ```

### Opsi 2: Server-side Proxy (Lebih Aman)

1. **Buat API route di Vercel**:
   Buat file `api/openrouter.ts`:
   ```typescript
   import { VercelRequest, VercelResponse } from '@vercel/node';
   
   export default async function handler(req: VercelRequest, res: VercelResponse) {
     const apiKey = process.env.OPENROUTER_API_KEY; // Tanpa prefix VITE_
     
     if (!apiKey) {
       return res.status(500).json({ error: 'API key not configured' });
     }
   
     // Forward request ke OpenRouter
     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${apiKey}`,
         'Content-Type': 'application/json',
         'HTTP-Referer': req.headers.referer || '',
         'X-Title': 'Math K-2'
       },
       body: JSON.stringify(req.body)
     });
   
     const data = await response.json();
     res.status(response.status).json(data);
   }
   ```

2. **Di Vercel Dashboard**:
   - Tambahkan environment variable:
     ```
     Name: OPENROUTER_API_KEY
     Value: sk-or-v1-key1,sk-or-v1-key2,... (tanpa prefix VITE_)
     ```

3. **Update kode frontend**:
   Ubah URL API dari `https://openrouter.ai/api/v1/chat/completions` ke `/api/openrouter`

### Opsi 3: Quick Fix - Gunakan API Keys Hardcoded (TIDAK DIREKOMENDASIKAN)

Kalau mau cepet, tinggal pastikan API keys di `src/lib/aiConfig.ts` bener dan gak di-override oleh env vars.

## REKOMENDASI TAMBAHAN:

1. **Untuk production**, selalu pakai server-side proxy biar API keys gak terekspos di client-side
2. **Tambahkan error logging** di Vercel untuk debug lebih lanjut
3. **Gunakan Vercel Analytics** untuk monitoring penggunaan API

## LANGKAH SELANJUTNYA:

1. Pilih salah satu opsi di atas
2. Implementasi sesuai instruksi
3. Deploy ulang ke Vercel
4. Test dengan soal matematika sederhana

Kalau masih error, cek:
- Format API keys (tanpa spasi)
- Prefix variable environment (VITE_ untuk client-side)
- Hak akses API keys di OpenRouter dashboard