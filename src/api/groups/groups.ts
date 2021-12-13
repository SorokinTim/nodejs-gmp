import { Router } from "express";
import { ValidatedRequest, createValidator } from "express-joi-validation";
import { GroupRequestSchema, GroupSchema } from "../../schemas/group";
import GroupService from "../../services/groups/groupService";
import ApiError from "../../errors/ApiError";

const router = Router();
const service = new GroupService();
const validator = createValidator();

router.get('/', async (req, res, next) => {
    try {
        const groups = await service.getGroups();

        if (!groups.length) {
            next(ApiError.dataIsNotAnyMatch());
            return;
        }

        res.send(groups);
    } catch (error: any) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const group = await service.getGroupById(id);

        if (!group) {
            next(ApiError.nonExistentData('Group', 'id'));
            return;
        }

        res.send(group);
    } catch (error: any) {
        next(error);
    }
});

router.post('/', validator.body(GroupSchema), async (req: ValidatedRequest<GroupRequestSchema>, res, next) => {
    try {
        res.send(await service.createGroup(req.body));
    } catch (error: any) {
        next(error);
    }
});

router.put('/:id', validator.body(GroupSchema), async (req: ValidatedRequest<GroupRequestSchema>, res, next) => {
    try {
        const { id } = req.params;

        const updatedGroup = await service.updateGroupById(id, req.body);

        if (!updatedGroup) {
            next(ApiError.nonExistentData('Group', 'id'));
            return;
        }

        res.send(updatedGroup);
    } catch (error: any) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedGroup = await service.deleteGroupById(id);

        if (!deletedGroup) {
            next(ApiError.nonExistentData('Group', 'id'));
            return;
        }

        res.send(deletedGroup);
    } catch (error: any) {
        next(error);
    }
});

export default router;
