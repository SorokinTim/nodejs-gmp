import { Router } from "express";
import { ValidatedRequest, createValidator } from "express-joi-validation";
import storage from "../../services/storage";
import UserService from "../../services/users/userService";
import { UserRequestSchema, UserSchema } from "../../schemas/user";

const router = Router();
const userService = new UserService(storage);
const validator = createValidator();

router.get('/', (req, res) => {
    const { loginSubstring, limit } = req.query;
    const substring = loginSubstring && typeof loginSubstring === 'string' ? loginSubstring : undefined;
    const limitUsers = parseInt(String(limit)) || undefined;

    res.send(userService.getAutoSuggestUsers(substring, limitUsers));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    res.send(userService.getUserById(id) || {});
});

router.post('/', validator.body(UserSchema), (req: ValidatedRequest<UserRequestSchema>, res) => {
    res.send(userService.createUser(req.body));
});

router.put('/:id', validator.body(UserSchema), (req: ValidatedRequest<UserRequestSchema>, res) => {
    const { id } = req.params;

    res.send(userService.updateUserById(id, req.body));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    res.send(userService.deleteUserById(id));
});

export default router;
