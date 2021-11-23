import Joi from "joi";
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";

export interface UserGroupRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        userIds: string[],
    }
}

export const UserGroupSchema = Joi.object({
    userIds: Joi.array().items(Joi.string().uuid()).required(),
})
