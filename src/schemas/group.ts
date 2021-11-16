import Joi from "joi";
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import { Group, GroupInternalProps } from "../types/group";

export interface GroupRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Omit<Group, GroupInternalProps>;
}

export const GroupSchema = Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().pattern(/^(READ|WRITE|DELETE|SHARE|UPLOAD_FILES)$/)).required(),
});
