const questionService = require("../services/questionService");

async function createQuestion(req, res) {
    try {
        const question = await questionService.createQuestion(req.body, req.user);

        return res.status(201).json({
            success: true,
            message: "Question created successfully",
            data: question
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createQuestion
};