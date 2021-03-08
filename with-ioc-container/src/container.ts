import { Container } from "inversify";
import { TYPES } from "./constants";
import { logger } from "./logger/logger";
import { UsersModule } from "./users/module";
import { CommentsModule } from "./comments/module";

let container = new Container();

container.bind(TYPES.LOGGER).toConstantValue(logger);

container.load(UsersModule, CommentsModule);

export default container;
