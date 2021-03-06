const ironSessionConfig = {
  password: process.env.IRON_SESSION_PASSWORD,
  cookieName: "token",
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};

const GAME_STATUS = {
  STARTED: 0,
  WON: 1,
  LOOSE: 2,
  ANSWERED: 3
};

// Moscow Timezone
const GAME_START_TIME = {
  hour: parseInt(process.env.GAME_START_HOUR) || 0,
  minute: parseInt(process.env.GAME_START_MINUTE) || 0,
  weekday: parseInt(process.env.GAME_START_WEEKDAY) || 1,
};

const QUESTIONS_QUANTITY = 10; // You can do it lower but not higher (yet)
const DISABLE_WAITING_ROOM = process.env.DISABLE_WAITING_ROOM || false;
const REGISTRATION_IS_ALWAYS_OPEN = process.env.REGISTRATION_IS_ALWAYS_OPEN || false;
const TIME_TO_ANSWER = 17;
const TIME_TO_CHECK_ANSWER = 2;

module.exports = {
  poweredByHeader: false,
  reactStrictMode: true,
  serverRuntimeConfig: {
    ironSessionConfig,
    GAME_START_TIME,
    GAME_STATUS,
    DISABLE_WAITING_ROOM,
    REGISTRATION_IS_ALWAYS_OPEN,
  },
  publicRuntimeConfig: {
    QUESTIONS_QUANTITY,
    TIME_TO_ANSWER,
    TIME_TO_CHECK_ANSWER
  },
};
