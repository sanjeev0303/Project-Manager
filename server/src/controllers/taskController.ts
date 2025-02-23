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



/** CREATE TASK */
export const createTask = async (
    req: Request,
    res: Response
  ): Promise<void> => {

    const {
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
     } = req.body;

    try {
      const newTask = await client.task.create({
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
      })

      res.status(201).json(newTask);
    } catch (error:any) {
      res.status(500).json({ message:`Error creating task: ${error.message}` });
    }
  };



  /** UPDATE TASK */
  export const updateTaskStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
      const { taskId } = req.params;
      const { status } = req.body;
      if (typeof taskId !== 'string') {
          res.status(400).json({ message: `Invalid taskId: ${taskId}` });
          return;
      }
    try {
      const updateTasks = await client.task.update({
          where: {
              id: taskId
          },
         data: {
            status: status
         }
      });

      res.json(updateTasks);
    } catch (error: any) {
      res.status(500).json({ message:`Error updating tasks: ${error.message}` });
    }
  };
