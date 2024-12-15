import express from "express";
const router = express.Router();
import UserController from "../controllers/users_controller";
import users_controller from "../controllers/users_controller";

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

router.post("/", UserController.createUser);

router.delete("/:id", UserController.deleteUser);

router.put("/:id/details", users_controller.updateUser);

export default router;