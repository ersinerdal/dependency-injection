import express from "express";
import bodyParser from "body-parser";
import router from "./router";

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(3006, () => {
  console.log("The application (without-di-oop) is listening on port 3006!");
});
