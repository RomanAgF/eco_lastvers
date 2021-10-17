const ironSessionConfig = {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: "token",
    cookieOptions: {secure: process.env.NODE_ENV === "production"}
}

const GAME_STATUS = {STARTED: 0, WON: 1, LOOSE: 2};
const GAME_START_TIME = {hour: 12, minute: 48, weekday: 7}; // Moscow Timezone
const HINT_STATE = {UNUSED: 0, USED: 2, ACTIVE: 3};


module.exports = {
    poweredByHeader: false,
    reactStrictMode: true,
    serverRuntimeConfig: {
        ironSessionConfig,
        GAME_START_TIME,
        GAME_STATUS,
        HINT_STATE
    }
}