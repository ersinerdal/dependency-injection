import {UsersDependencies} from "./UsersDependencies";
import * as commentsService from "../../comments/CommentsService";

export interface UserDependencies extends UsersDependencies {
    commentsService: typeof commentsService;
}
