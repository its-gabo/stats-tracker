import { PrismaClient } from "@prisma/client";

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
          create: {
            kills,
            deaths,
            assists,
            wins: isWin ? 1 : 0,
            losses: isWin ? 0 : 1,
            kda: (kills + assists) / deaths,
            winRate: isWin ? 100 : 0,
            killParticipation,
          },
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

    const currentStats = await prisma.stats.findFirst({
      where: { player: { id: player.id } },
    });

    await prisma.player.update({
      where: { id: player.id },
      data: {
        stats: {
          update: {
            kills: currentStats!.kills + kills,
            deaths: currentStats!.deaths + deaths,
            assists: currentStats!.assists + assists,
            wins: currentStats!.wins + (isWin ? 1 : 0),
            losses: currentStats!.losses + (isWin ? 0 : 1),
            kda: (currentStats!.kda + (kills + assists) / deaths) / 2,
            winRate:
              ((currentStats!.wins + (isWin ? 1 : 0)) /
                (currentStats!.wins + currentStats!.losses + 1)) *
              100,
            killParticipation:
              (currentStats!.killParticipation + killParticipation) / 2,
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