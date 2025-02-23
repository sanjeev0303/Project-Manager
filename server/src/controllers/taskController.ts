import { Request, Response } from "express";
import { client } from "../lib/prisma";


/** GET TASK */
export const getTask = async (
  req: Request,
  res: Response
): Promise<void> => {
    const { projectId } = req.query;
    if (typeof projectId !== 'string') {
        res.status(400).json({ message: `Invalid projectId: ${projectId}` });
        return;
    }
  try {
    const tasks = await client.task.findMany({
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
  } catch (error: any) {
    res.status(500).json({ message:`Error retriving tasks: ${error.message}` });
  }
};
