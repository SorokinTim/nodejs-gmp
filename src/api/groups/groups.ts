import { Router } from "express";
import { ValidatedRequest, createValidator } from "express-joi-validation";
import { GroupRequestSchema, GroupSchema } from "../../schemas/group";
import GroupService from "../../services/groups/groupService";
import ApiError from "../../errors/ApiError";

const router = Router();
const service = new GroupService();
const validator = createValidator();

router.get('/', async (req, res, next) => {
    const groups = await service.getGroups();

    if (!groups.length) {
        next(ApiError.dataIsNotAnyMatch());
        return;
    }

    res.send(groups);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const group = await service.getGroupById(id);

    if (!group) {
        next(ApiError.nonExistentData('Group', 'id'));
        return;
    }

    res.send(group);
});

router.post('/', validator.body(GroupSchema), async (req: ValidatedRequest<GroupRequestSchema>, res) => {
    res.send(await service.createGroup(req.body));
});

router.put('/:id', validator.body(GroupSchema), async (req: ValidatedRequest<GroupRequestSchema>, res, next) => {
    const { id } = req.params;

    const updatedGroup = await service.updateGroupById(id, req.body);

    if (!updatedGroup) {
        next(ApiError.nonExistentData('Group', 'id'));
        return;
    }

    res.send(updatedGroup);
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const deletedGroup = await service.deleteGroupById(id);

    if (!deletedGroup) {
        next(ApiError.nonExistentData('Group', 'id'));
        return;
    }

    res.send(deletedGroup);
});

export default router;
