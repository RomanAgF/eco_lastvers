const {Server} = require("socket.io");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const io = new Server();
const {unsealData} = require("iron-session");
const {DateTime} = require("luxon");

function parseCookie(str) {
  return str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
}

io.use((socket, next) => {
  socket.cookies = parseCookie(socket.handshake.headers.cookie);
  const token = socket.cookies.token;
  const key = 'complex_password_at_least_32_characters_long'

  socket.session = unsealData(token, {password: key})
    .then(data => {
      socket.session = data;
      next();
    });
})

io.on("connection", socket => {
  prisma.gameSession.findUnique({where: {username: "admin#1234"}}).then(data => {
    socket.emit("questions", {
      id: 1,
      question: "What is the purpose of ECO points?",
      answers: [
        { text: "For profit purposes only", accept: false },
        { text: "For research purposes only", accept: true },
        { text: "For guaranteed allocation in ECO ICO", accept: false },
        { text: "For guaranteed airdrop of ECO tokens", accept: false },
      ],
    }, socket.id);
  })

  socket.on("message", event => {
    console.log(socket.session);
  })

})


io.listen(4000);
