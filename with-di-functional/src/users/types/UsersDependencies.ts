import {AxiosInstance} from "axios";
import {Logger} from "winston";

export interface UsersDependencies {
    usersClient: AxiosInstance;
    logger: Logger;
}
