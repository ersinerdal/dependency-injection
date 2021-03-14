import {AxiosInstance} from "axios";
import {Logger} from "winston";

export interface UsersDependencies {
    usersClient: Pick<AxiosInstance, "get">;
    logger: Pick<Logger, "error" | "info">;
}
