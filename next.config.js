const ironSessionConfig = {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "token",
    cookieOptions: {secure: process.env.NODE_ENV === "production"}
}

module.exports = {
    poweredByHeader: false,
    reactStrictMode: true,
    serverRuntimeConfig: {
        ironSessionConfig,
        GAME_START_TIME: {hour: 16, minute: 0, weekday: 6} // Moscow Timezone
    }
}