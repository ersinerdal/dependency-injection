import express from "express";
import bodyParser from "body-parser";
import router from "./router";

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(3005, () => {
  console.log("The application (without-di-functional) is listening on port 3005!");
});
