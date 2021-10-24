import { Router } from "express";
import storage from "../../services/storage";
import UserService from "../../services/users/userService";

const router = Router();
const userService = new UserService(storage);

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

router.post('/', (req, res) => {
    res.send(userService.createUser(req.body));
});

router.put('/:id', (req, res) => {
    const { id } = req.params;

    res.send(userService.updateUserById(id, req.body));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    res.send(userService.deleteUserById(id));
});

export default router;
