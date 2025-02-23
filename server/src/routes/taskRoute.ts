import { Router } from "express";
import { getTask } from "../controllers/taskController";


const router = Router()

router.get("/", getTask)

export default router;
