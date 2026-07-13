require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")
const invokeGeminiAi = require("./src/Services/ai.services")


connectToDB();
invokeGeminiAi()

app.listen(3000, () => {
    console.log("server is running on port 3000");
})