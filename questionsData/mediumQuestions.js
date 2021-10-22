const questions = [
    {
        id: 15,
        question:
            "What email is used for collecting feedback and ideas about new features for ECO app?",
        answers: [
            {text: "No email is used for it, you only can share it in discord server", accept: false},
            {text: "support@eco.com", accept: true},
            {text: "feedback@eco.com", accept: false},
            {text: "app.feedback@eco.com", accept: false},
        ]
    },
    {
        id: 16,
        question: `"What will The Accountant show if you write "!leaderboard" command?"`,
        answers: [
            {text: "Nice to meet you. Here’s how to talk to me:", accept: false},
            {text: "top 10 Points holders: ", accept: true},
            {text: "incorrect number of arguments: !leaderboard [how many users to show]", accept: false},
            {text: "top 25 Points holders: ", accept: false},
        ],
    },
    {
        id: 17,
        question: `"Who was agressively buying points in June and started transparent deals with "OTC" comment in points-bartering?"`,
        answers: [
            {text: "cooloNe", accept: false},
            {text: "ARTEM LAZAREV", accept: true},
            {text: "prontera", accept: false},
            {text: "w124eth", accept: false},
        ],
    },
    {
        id: 18,
        question: `"Which room exists in "other languages" block?"`,
        answers: [
            {text: "vnvt-eco", accept: true},
            {text: "ukukr-eco", accept: false},
            {text: "chch-eco", accept: false},
            {text: "kokor-eco", accept: false},
        ],
    },
    {
        id: 19,
        question: "Which room is deleted from Discord channel?",
        answers: [
            {text: "past-audio", accept: false},
            {text: "how-to-onboard", accept: false},
            {text: "invite-thank-yous", accept: true},
            {text: "lotteries-test", accept: false},
        ],
    },
    {
        id: 20,
        question: "Who is one of creators of ECO-Leaderboard?",
        answers: [
            {text: "passenger", accept: false},
            {text: "Angry", accept: true},
            {text: "Jeremie", accept: false},
            {text: "Igrex", accept: false},
        ],
    },
    {
        id: 21,
        question: "Which of these bots doesn't exist in ECO Discord?",
        answers: [
            {text: "Eco Meme", accept: false},
            {text: "Eco Voting Captcha", accept: false},
            {text: "Eco story", accept: false},
            {text: "Eco Official FAQ", accept: true},
        ],
    },
    {
        id: 22,
        question: "What is the aim of Unsung Heros channel?",
        answers: [
            {text: "to discuss the future of the Discord server and bounties", accept: false},
            {text: "to highlight ECO member's outstanding work done in last 7 days", accept: true},
            {text: "to choose whom to send a donation this week", accept: false},
            {text: "to share stories about doing something good to other people", accept: false},
        ],
    },
]

export default questions;