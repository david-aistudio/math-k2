/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENROUTER_API_KEY: string;
  // tambahkan env variables lainnya di sini
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}