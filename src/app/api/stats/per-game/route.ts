import { StatsPerGame } from "@/types";
import { PrismaClient } from "@prisma/client";

type ITotalStats = StatsPerGame & {
  wins: number;
  losses: number;
};

export async function POST(request: Request) {
  const prisma = new PrismaClient();

  const { nickname, kills, deaths, assists, killParticipation, isWin } =
    await request.json();

  try {
    const player = await prisma.player.upsert({
      where: { nickname },
      update: {},
      create: {
        nickname,
        stats: {
          create: {},
        },
      },
    });

    await prisma.statsPerGame.create({
      data: {
        kills,
        deaths,
        assists,
        killParticipation,
        isWin,
        playerId: player.id,
      },
    });

    const allStats = await prisma.statsPerGame.findMany({
      where: { player: { nickname } },
    });

    const totalStats: Omit<ITotalStats, "id" | "createdAt" | "isWin"> =
      allStats.reduce(
        (acc, curr) => {
          return {
            kills: acc.kills + curr.kills,
            deaths: acc.deaths + curr.deaths,
            assists: acc.assists + curr.assists,
            wins: acc.wins + (curr.isWin ? 1 : 0),
            losses: acc.losses + (curr.isWin ? 0 : 1),
            killParticipation: acc.killParticipation + curr.killParticipation,
          };
        },
        {
          kills: 0,
          deaths: 0,
          assists: 0,
          wins: 0,
          losses: 0,
          killParticipation: 0,
        }
      );

    await prisma.player.update({
      where: { id: player.id },
      data: {
        stats: {
          update: {
            kills: totalStats.kills,
            deaths: totalStats.deaths,
            assists: totalStats.assists,
            wins: totalStats.wins,
            losses: totalStats.losses,
            kda: (totalStats.kills + totalStats.assists) / totalStats.deaths,
            winRate: (totalStats.wins / totalStats.losses) * 100,
            killParticipation:
              totalStats.killParticipation / totalStats.wins +
              totalStats.losses,
          },
        },
      },
    });

    return Response.json({ message: "Stats updated successfully" });
  } catch (error) {
    return Response.json({ error });
  } finally {
    await prisma.$disconnect();
  }
}
