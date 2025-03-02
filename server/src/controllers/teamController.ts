import { Request, Response } from "express";
import { client } from "../lib/prisma";

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await client.team.findMany();

    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        const productOwner = await client.user.findUnique({
          where: { userId: String(team.productOwnerUserId) },
          select: { username: true },
        });

        const projectManager = await client.user.findUnique({
          where: { userId: String(team.projectManagerUserId) },
          select: { username: true },
        });

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: projectManager?.username,
        };
      })
    );

    res.json(teamsWithUsernames);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving teams: ${error.message}` });
  }
};
