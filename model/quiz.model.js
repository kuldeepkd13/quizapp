const mongoose = require("mongoose");

const quizScehma = mongoose.Schema({
    "creator": String,
    "title": String,
    "description": String,
    "questions": [
        {
            "title": String,
            "answerOptions": [String],
            "correctOptions": String
        }
    ],
    "leaderboard":[
        {
            "email":String,
            "score":Number
        }
    ]
})

const QuizModel = mongoose.model("quiz", quizScehma)

module.exports = { QuizModel }