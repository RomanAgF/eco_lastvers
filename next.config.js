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
        GAME_START_TIME: {hour: 21, minute: 25, weekday: 4} // Moscow Timezone
    }
}