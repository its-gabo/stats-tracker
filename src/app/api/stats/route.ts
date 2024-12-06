import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const stats = await prisma.stats.findMany({
      include: {
        player: true,
      },
    });

    const statsWithPlayerNickname = stats.map((stat) => ({
      ...stat,
      nickname: stat!.player!.nickname,
      games: stat.wins + stat.losses,
    }));

    return Response.json(statsWithPlayerNickname);
  } catch (error) {
    return {
      status: 500,
      body: { error: "Failed to fetch stats", errorMessage: error },
    };
  } finally {
    await prisma.$disconnect();
  }
}
