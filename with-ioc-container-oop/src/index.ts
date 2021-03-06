import "reflect-metadata";
import * as bodyParser from "body-parser";
import container from "./container";
import { InversifyExpressServer } from "inversify-express-utils";

let server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3004, () => {
  console.log("The application (with-ioc-container-oop) is listening on port 3004!");
});
