import { Router } from "express";
import { createValidator, ValidatedRequest } from "express-joi-validation";
import GroupService from "../../../services/groups/groupService";
import { UserGroupSchema, UserGroupRequestSchema } from "../../../schemas/userGroup";
import { SOMETHING_WENT_WRONG } from "../../../constants/errorConstants";

const router = Router();
const service = new GroupService();
const validator = createValidator();

router.post('/:id', validator.body(UserGroupSchema), async (req: ValidatedRequest<UserGroupRequestSchema>, res) => {
    const { id } = req.params;
    const { userIds } = req.body;

    const group = await service.addUsersToGroup(id, userIds);

    if (!group?.length) {
        res.status(404).send(SOMETHING_WENT_WRONG);
    }

    res.send(group);
})

export default router;
