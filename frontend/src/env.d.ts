interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  /** Описание вашей переменной для автодополнения */
  readonly NG_APP_API_KEY: string;
  readonly NG_APP_SECRET_KEY: string;
  // добавьте другие переменные, если они есть
}
