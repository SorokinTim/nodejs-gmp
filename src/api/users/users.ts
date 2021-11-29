import { Router } from "express";
import { ValidatedRequest, createValidator } from "express-joi-validation";
import UserService from "../../services/users/userService";
import { UserRequestSchema, UserSchema } from "../../schemas/user";
import ApiError from "../../errors/ApiError";

const router = Router();
const service = new UserService();
const validator = createValidator();

router.get('/', async (req, res, next) => {
    const { loginSubstring, limit } = req.query;
    const substring = loginSubstring && typeof loginSubstring === 'string' ? loginSubstring : undefined;
    const limitUsers = parseInt(String(limit)) || undefined;
    const suggestedUsers = await service.getAutoSuggestUsers(substring, limitUsers);

    if (!suggestedUsers.length) {
        next(ApiError.dataIsNotAnyMatch());
        return;
    }

    res.send(suggestedUsers);
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const user = await service.getUserById(id);

    if (!user) {
        next(ApiError.nonExistentData('User', 'id'));
        return;
    }

    res.send(user);
});

router.post('/', validator.body(UserSchema), async (req: ValidatedRequest<UserRequestSchema>, res) => {
    res.send(await service.createUser(req.body));
});

router.put('/:id', validator.body(UserSchema), async (req: ValidatedRequest<UserRequestSchema>, res, next) => {
    const { id } = req.params;

    const updatedUser = await service.updateUserById(id, req.body);

    if (!updatedUser) {
        next(ApiError.nonExistentData('User', 'id'));
        return;
    }

    res.send(updatedUser);
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await service.deleteUserById(id);

    if (!deletedUser) {
        next(ApiError.nonExistentData('User', 'id'));
        return;
    }

    res.send(deletedUser);
});

export default router;
