const express = require("express");
require("dotenv").config();


const openAI = require("openai");

const Configuration = openAI.Configuration;
const OpenAIApi = openAI.OpenAIApi;

const chatRouter = express.Router();
// const { Configuration, OpenAIApi } = openAI;

// import { Configuration, OpenAIApi } from "openai";
// dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

chatRouter.get("/", async (req, res) => {
  res.status(200).send({ message: "hello codex" });
});

chatRouter.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({ message: err.message });
  }
});
module.exports = { chatRouter };
