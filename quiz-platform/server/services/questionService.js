const db = require("../config/db");

/**
 * Create question and answers in a single transaction
 */
async function createQuestion(data, user) {
    const client = await db.connect();

    try {
        await client.query("BEGIN");

        const {
            question_text,
            category_id,
            difficulty,
            answers
        } = data;

        // Validation
        if (!answers || answers.length < 2) {
            throw new Error("A question must have at least two answers.");
        }

        const correctAnswers = answers.filter(a => a.is_correct);

        if (correctAnswers.length !== 1) {
            throw new Error("A question must have exactly one correct answer.");
        }

        // Insert question
        const questionResult = await client.query(
            `INSERT INTO questions
            (question_text, category_id, difficulty, created_by)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                question_text,
                category_id,
                difficulty,
                user.id
            ]
        );

        const question = questionResult.rows[0];

        const insertedAnswers = [];

        // Insert answers
        for (const answer of answers) {

            const result = await client.query(
                `INSERT INTO answers
                (question_id, answer_text, is_correct)
                VALUES ($1, $2, $3)
                RETURNING *`,
                [
                    question.id,
                    answer.text,
                    answer.is_correct
                ]
            );

            insertedAnswers.push(result.rows[0]);
        }

        await client.query("COMMIT");

        return {
            question,
            answers: insertedAnswers
        };

    } catch (error) {

        await client.query("ROLLBACK");
        throw error;

    } finally {

        client.release();

    }
}

module.exports = {
    createQuestion
};