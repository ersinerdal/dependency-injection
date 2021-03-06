import express from "express";
import bodyParser from "body-parser";
import router from "./router";

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(3002, () => {
  console.log("The application (with-di-oop) is listening on port 3002!");
});
