const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());

app.use(express.json());

const {chatRouter} = require("./router.openai");

app.use("/", chatRouter);

app.get("/", async (req, res) => {
  res.status(200).send({ message: "hello codex" });
});


app.listen(5000, ()=>{
    console.log("server listen on PORT http://localhost:5000");
})