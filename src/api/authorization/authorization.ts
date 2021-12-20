import { Router } from "express";
import UserService from "../../services/users/userService";

const router = Router();
const service = new UserService();

router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const { login, password } = body;

        const token = await service.authorizeUser(login, password);

        res.json({ token });
    } catch (error) {
        next(error);
    }
});

export default router;
