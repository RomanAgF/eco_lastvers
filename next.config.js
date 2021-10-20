const ironSessionConfig = {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: "token",
    cookieOptions: {secure: process.env.NODE_ENV === "production"}
}

const GAME_STATUS = {STARTED: 0, WON: 1, LOOSE: 2};
const GAME_START_TIME = {hour: 10, minute: 27, weekday: 3}; // Moscow Timezone

module.exports = {
    poweredByHeader: false,
    reactStrictMode: true,
    serverRuntimeConfig: {
        ironSessionConfig,
        GAME_START_TIME,
        GAME_STATUS,
    }
}