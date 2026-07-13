require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")
const {resume, selfDescription, jobDescription} = require("./src/Services")

connectToDB();
invokeGeminiAi()

app.listen(3000, () => {
    console.log("server is running on port 3000");
})