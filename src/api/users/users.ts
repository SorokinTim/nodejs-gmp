import { Router } from "express";
import { ValidatedRequest, createValidator } from "express-joi-validation";
import UserService from "../../services/users/userService";
import { UserRequestSchema, UserSchema } from "../../schemas/user";
import { DATA_IS_NOT_ANY_MATCH, USER_DOES_NOT_EXIST } from "../../constants/errorConstants";

const router = Router();
const userService = new UserService();
const validator = createValidator();

router.get('/', async (req, res) => {
    const { loginSubstring, limit } = req.query;
    const substring = loginSubstring && typeof loginSubstring === 'string' ? loginSubstring : undefined;
    const limitUsers = parseInt(String(limit)) || undefined;
    const suggestedUsers = await userService.getAutoSuggestUsers(substring, limitUsers);

    if (!suggestedUsers.length) {
        res.status(404).send(DATA_IS_NOT_ANY_MATCH);
    }

    res.send(suggestedUsers);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
        res.status(404).send(USER_DOES_NOT_EXIST);
    }

    res.send(user);
});

router.post('/', validator.body(UserSchema), async (req: ValidatedRequest<UserRequestSchema>, res) => {
    res.send(await userService.createUser(req.body));
});

router.put('/:id', validator.body(UserSchema), async (req: ValidatedRequest<UserRequestSchema>, res) => {
    const { id } = req.params;

    const updatedUser = await userService.updateUserById(id, req.body);

    if (!updatedUser) {
        res.status(404).send(USER_DOES_NOT_EXIST);
    }

    res.send(updatedUser);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await userService.deleteUserById(id);

    if (!deletedUser) {
        res.status(404).send(USER_DOES_NOT_EXIST);
    }

    res.send(deletedUser);
});

export default router;
