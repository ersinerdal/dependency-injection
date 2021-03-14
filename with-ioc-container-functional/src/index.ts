import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import router from "./router";

const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(3003, () => {
  console.log("The application (with-ioc-container-functional)  is listening on port 3003!");
});
