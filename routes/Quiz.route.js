const express = require("express");
const { QuizModel } = require("../model/quiz.model");

const quizRoute = express.Router();

quizRoute.post("/add", async (req, res) => {
    try {
        const { title, creator, description, questions } = req.body;

        const quiz = new QuizModel({ title, creator, description, questions })
        await quiz.save()
        res.status(200).send({ "msg": "Quiz created", quiz })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})
quizRoute.get("/getquiz", async (req, res) => {
    try {


        const quiz = await QuizModel.find()

        res.status(200).send({ "msg": "Quiz", quiz })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

quizRoute.get("/get/:id", async (req, res) => {
    try {

    const {id} = req.params
        const quiz = await QuizModel.findById({_id:id})

        res.status(200).send({ "msg": "Quiz", quiz })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

quizRoute.patch("/update/:id", async (req, res) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params
        const quiz = await QuizModel.find({ _id: id })
        if (!quiz) {
            return res.status(400).send({ "msg": "no quiz" })

        }
        const updatedquiz = await QuizModel.findByIdAndUpdate(
            {_id:id},
            { $set: { title, description } },
            { new: true }
        );
        res.status(200).send({ "msg": "Quiz is updated", updatedquiz })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})
quizRoute.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        const quiz = await QuizModel.find({ _id: id })
        if (!quiz) {
            return res.status(400).send({ "msg": "no quiz" })

        }
        const deletequiz = await QuizModel.findByIdAndDelete({ _id: id })
        res.status(200).send({ "msg": "deletequiz" })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})
quizRoute.patch("/update/leaderboard/:id", async (req, res) => {
    try {
        const { leaderboard } = req.body;
        const { id } = req.params
        const quiz = await QuizModel.find({ _id: id })
        if (!quiz) {
            return res.status(400).send({ "msg": "no quiz" })

        }
        const updatedquiz = await QuizModel.findByIdAndUpdate(
            {_id:id},
            { $set: { leaderboard } },
            { new: true }
        );
        res.status(200).send({ "msg": "Quiz leaderboard is updated", updatedquiz })
    } catch (error) {
        res.status(400).send({ "msg": error.message })
    }
})

// get leaderboard
quizRoute.get("/leaderboard/:id",async(req,res)=>{
    try {

        const {id} = req.params
            const quiz = await QuizModel.findById({_id:id})
           let leaderboard =quiz.leaderboard
            res.status(200).send({ "msg": "Quiz", leaderboard })
        } catch (error) {
            res.status(400).send({ "msg": error.message })
        }
})

module.exports = { quizRoute }