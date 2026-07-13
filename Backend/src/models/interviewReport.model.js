const mongoose = require('mongoose')

/**
 * - job description schema
 * - resume text
 * - self description
 * 
 * - match score
 * 
 * - Technical questions
 * - Behavioural questions
 * - skill gaps
 * - preparations plan 
 */

const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intentions: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id:false
})

const BehaviouralQustionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intentions: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id:false
})

const skillGapsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intentions: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id:false
}
)

const preparationsPlanSchema = new mongoose.Schema({
    day: {
        type: String,
        required: [ true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: {
        type: String,
        required: [true, "Task is required"]
    }
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "job description is required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [technicalQuestionsSchema],
    BehaviouralQustionSchema: [BehaviouralQustionSchema],
    skillGapsSchema: [skillGapsSchema],
    preparationsPlanSchema: [preparationsPlanSchema]
}, {
    timestamps: true
})

const interviewReportModel = mongoose.model("IntervewReport", interviewReportSchema);

module.exports = interviewReportModel;