import { Router } from "express";
import { ValidatedRequest, createValidator } from "express-joi-validation";
import { GroupRequestSchema, GroupSchema } from "../../schemas/group";
import GroupService from "../../services/groups/groupService";
import { DATA_IS_NOT_ANY_MATCH, GROUP_DOES_NOT_EXIST } from "../../constants/errorConstants";

const router = Router();
const service = new GroupService();
const validator = createValidator();

router.get('/', async (req, res) => {
    const groups = await service.getGroups();

    if (!groups.length) {
        res.status(404).send(DATA_IS_NOT_ANY_MATCH);
    }

    res.send(groups);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const group = await service.getGroupById(id);

    if (!group) {
        res.status(404).send(GROUP_DOES_NOT_EXIST);
    }

    res.send(group);
});

router.post('/', validator.body(GroupSchema), async (req: ValidatedRequest<GroupRequestSchema>, res) => {
    res.send(await service.createGroup(req.body));
});

router.put('/:id', validator.body(GroupSchema), async (req: ValidatedRequest<GroupRequestSchema>, res) => {
    const { id } = req.params;

    const updatedGroup = await service.updateGroupById(id, req.body);

    if (!updatedGroup) {
        res.status(404).send(GROUP_DOES_NOT_EXIST);
    }

    res.send(updatedGroup);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedGroup = await service.deleteGroupById(id);

    if (!deletedGroup) {
        res.status(404).send(GROUP_DOES_NOT_EXIST);
    }

    res.send(deletedGroup);
});

export default router;
