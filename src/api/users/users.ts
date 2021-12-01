import { Router } from "express";
import { ValidatedRequest, createValidator } from "express-joi-validation";
import UserService from "../../services/users/userService";
import { UserRequestSchema, UserSchema } from "../../schemas/user";
import { unknownErrorLoggerMiddleware } from "../../middlewares/errorHandler";
import ApiError from "../../errors/ApiError";

const router = Router();
const service = new UserService();
const validator = createValidator();

router.get('/', async (req, res, next) => {
    try {
        const { loginSubstring, limit } = req.query;
        const substring = loginSubstring && typeof loginSubstring === 'string' ? loginSubstring : undefined;
        const limitUsers = parseInt(String(limit)) || undefined;
        const suggestedUsers = await service.getAutoSuggestUsers(substring, limitUsers);

        if (!suggestedUsers.length) {
            next(ApiError.dataIsNotAnyMatch());
            return;
        }

        res.send(suggestedUsers);
    } catch (error: any) {
        unknownErrorLoggerMiddleware(error, req, res, next);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await service.getUserById(id);

        if (!user) {
            next(ApiError.nonExistentData('User', 'id'));
            return;
        }

        res.send(user);
    } catch (error: any) {
        unknownErrorLoggerMiddleware(error, req, res, next);
    }
});

router.post('/', validator.body(UserSchema), async (req: ValidatedRequest<UserRequestSchema>, res, next) => {
    try {
        res.send(await service.createUser(req.body));
    } catch (error: any) {
        unknownErrorLoggerMiddleware(error, req, res, next);
    }
});

router.put('/:id', validator.body(UserSchema), async (req: ValidatedRequest<UserRequestSchema>, res, next) => {
    try {
        const { id } = req.params;

        const updatedUser = await service.updateUserById(id, req.body);

        if (!updatedUser) {
            next(ApiError.nonExistentData('User', 'id'));
            return;
        }

        res.send(updatedUser);
    } catch (error: any) {
        unknownErrorLoggerMiddleware(error, req, res, next);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await service.deleteUserById(id);

        if (!deletedUser) {
            next(ApiError.nonExistentData('User', 'id'));
            return;
        }

        res.send(deletedUser);
    } catch (error: any) {
        unknownErrorLoggerMiddleware(error, req, res, next);
    }
});

export default router;
