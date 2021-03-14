import {AxiosInstance} from "axios";
import {Logger} from "winston";

export interface CommentsServiceDependencies {
    commentsClient: Pick<AxiosInstance, "get">;
    logger: Pick<Logger, "error">;
}
