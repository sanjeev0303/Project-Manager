"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTasks = exports.updateTaskStatus = exports.createTask = exports.getTask = void 0;
const prisma_1 = require("../lib/prisma");
/** GET TASK */
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.query;
    if (typeof projectId !== 'string') {
        res.status(400).json({ message: `Invalid projectId: ${projectId}` });
        return;
    }
    try {
        const tasks = yield prisma_1.client.task.findMany({
            where: {
                projectId: projectId
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            }
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: `Error retriving tasks: ${error.message}` });
    }
});
exports.getTask = getTask;
/** CREATE TASK */
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
    try {
        const newTask = yield prisma_1.client.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            }
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ message: `Error creating task: ${error.message}` });
    }
});
exports.createTask = createTask;
/** UPDATE TASK */
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { status } = req.body;
    if (typeof taskId !== 'string') {
        res.status(400).json({ message: `Invalid taskId: ${taskId}` });
        return;
    }
    try {
        const updateTasks = yield prisma_1.client.task.update({
            where: {
                id: taskId
            },
            data: {
                status: status
            }
        });
        res.json(updateTasks);
    }
    catch (error) {
        res.status(500).json({ message: `Error updating tasks: ${error.message}` });
    }
});
exports.updateTaskStatus = updateTaskStatus;
const getUserTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const tasks = yield prisma_1.client.task.findMany({
            where: {
                OR: [
                    { authorUserId: userId },
                    { assignedUserId: userId },
                ],
            },
            include: {
                author: true,
                assignee: true,
            },
        });
        res.json(tasks);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving user's tasks: ${error.message}` });
    }
});
exports.getUserTasks = getUserTasks;
