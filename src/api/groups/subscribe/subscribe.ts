import { Router } from "express";
import { createValidator, ValidatedRequest } from "express-joi-validation";
import GroupService from "../../../services/groups/groupService";
import { UserGroupSchema, UserGroupRequestSchema } from "../../../schemas/userGroup";
import ApiError from "../../../errors/ApiError";

const router = Router();
const service = new GroupService();
const validator = createValidator();

router.post('/:id', validator.body(UserGroupSchema), async (req: ValidatedRequest<UserGroupRequestSchema>, res, next) => {
    try {
        const { id } = req.params;
        const { userIds } = req.body;

        const group = await service.addUsersToGroup(id, userIds);

        if (!group?.length) {
            next(ApiError.internalServerError());
            return;
        }

        res.send(group);
    } catch (error: any) {
        next(error);
    }
})

export default router;
