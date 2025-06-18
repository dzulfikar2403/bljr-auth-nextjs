const config = {
    env:{
        db:{
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            name: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        },
        github: {
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        }
    }
}

export default config;