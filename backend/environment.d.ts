declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number
            DB_NAME: string
            DB_USER: string
            DB_PASSWORD: string
            DB_HOST: string
            DB_POST: number

            JWT_ACCESS_SECRET: string
            JWT_REFRESH_SECRET: string

            SMTP_HOST: string
            SMTP_PORT: number
            SMTP_USER: string
            SMTP_PASSWORD: string
            API_URL: string
            CLIENT_URL: string
        }
    }
}

export {}