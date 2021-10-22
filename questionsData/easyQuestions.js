const questions = [
    {
        id: 1,
        question: "What is the purpose of ECO points?",
        answers: [
            {text: "For profit purposes only", accept: false},
            {text: "For research purposes only", accept: true},
            {text: "For guaranteed allocation in ECO ICO", accept: false},
            {text: "For guaranteed airdrop of ECO tokens", accept: false},
        ]
    },
    {
        id: 2,
        question:
            "Which place is used most of all for participating in ECO bounties?",
        answers: [
            {text: "Telegram chat", accept: false},
            {text: "Discord", accept: true},
            {text: "Wechat", accept: false},
            {text: "Slack", accept: false},
        ]
    },
    {
        id: 3,
        question: "Who is Andy Bromberg?",
        answers: [
            {text: "CEO at ECO", accept: false},
            {text: "Co-founder at Coinlist", accept: false},
            {
                text: "Founding research scientist at the Stanford Bitcoin Group.",
                accept: false,
            },
            {text: "All of the above", accept: true}
        ]
    },
    {
        id: 4,
        question: "What is ECO's official Twitter (@name)?",
        answers: [
            {text: "eco", accept: true},
            {text: "ecoapp", accept: false},
            {text: "eco_cashback", accept: false},
            {text: "eco_not_a_bank", accept: false},
        ],
    },
    {
        id: 5,
        question: "What is ECO's official Telegram channel?",
        answers: [
            {text: "Eco_US", accept: false},
            {text: "There is no official telegram channel", accept: true},
            {text: "Ecoapp", accept: false},
            {text: "eco_official", accept: false},
        ],
    },
    {
        id: 6,
        question:
            "You earn __ cashback at the places you spend the most, and up to __ on your balance the rest of the time. Fill the spaces.",
        answers: [
            {text: "4%, 5%", accept: false},
            {text: "2.5%, 2.5%", accept: false},
            {text: "1%, 5%", accept: false},
            {text: "5%, 5%", accept: true},
        ],
    },
    {
        id: 7,
        question: "Which hashtag you can see most of all in Eco Twitter?",
        answers: [
            {text: "#ecoisabank", accept: false},
            {text: "#FAQ", accept: false},
            {text: "#takeyourcashback", accept: true},
            {text: "#econews", accept: false},
        ],
    },
    {
        id: 8,
        question: "What you can do with Eco App?",
        answers: [
            {text: "Spend money", accept: false},
            {text: "All of the above", accept: true},
            {text: "Make money", accept: false},
            {text: "Send money", accept: false},
        ],
    },
    {
        id: 9,
        question: "How long is verification process in ECO app?",
        answers: [
            {text: "1-3 minutes", accept: false},
            {text: "1-3 hours", accept: false},
            {text: "1-3 business days", accept: true},
            {text: "1-3 business weeks", accept: false},
        ],
    },
    {
        id: 10,
        question: "When does 5% cash back arrive?",
        answers: [
            {text: "Monthly", accept: true},
            {text: "Daily", accept: false},
            {text: "Weekly", accept: false},
            {text: "1-3 business weeks", accept: false},
        ],
    },
    {
        id: 11,
        question: "Who can use the App right now? (June 2021)",
        answers: [
            {text: "Android users in US", accept: false},
            {text: "Android and iPhone users worldwide", accept: false},
            {text: "iPhone users in US, Android users worldwide", accept: false},
            {text: "iPhone users in US", accept: true},
        ],
    },
    {
        id: 12,
        question:
            "How many downloads of ECO app during the first year will be counted as success by Andy Bromberg?",
        answers: [
            {text: ">900000", accept: false},
            {text: ">550000", accept: false},
            {text: "Andy doesn't rate amount of downloads as a measure of success", accept: true},
            {text: ">2000000", accept: false},
        ],
    },
    {
        id: 13,
        question:
            "What do you need to write in Discord to get info on how to get points?",
        answers: [
            {text: "faq.points", accept: true},
            {text: "faq_points", accept: false},
            {text: "!points", accept: false},
            {text: "!faq", accept: false},
        ],
    },
    {
        id: 14,
        question:
            "What is the name of the channel where there is only 1 message that is hidden?",
        answers: [
            {text: "how-to-onboard", accept: false},
            {text: "secret-teaser", accept: true},
            {text: "the-dispatch", accept: false},
            {text: "community-guidelines", accept: false},
        ]
    },
];

export default questions;