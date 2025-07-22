import Router from "express";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";
import { PrismaClient } from "@prisma/client";

const router = Router();

const prismaClient = new PrismaClient();
const userRepository = new UserRepository(prismaClient);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/", (req, res, next) =>
  userController.generateNumber(req, res, next)
);

export default router;
