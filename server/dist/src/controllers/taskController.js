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
exports.getTask = void 0;
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
