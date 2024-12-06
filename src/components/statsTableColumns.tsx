import { ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Stats } from "@/types";

type ExtendedStats = Stats & { nickname: string };

export const statsTableColumns: ColumnDef<ExtendedStats>[] = [
  {
    accessorKey: "nickname",
    header: ({ column }: { column: Column<ExtendedStats> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nickname
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("nickname")}</div>
    ),
  },
  {
    accessorKey: "kills",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kills
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("kills")}</div>
    ),
  },
  {
    accessorKey: "deaths",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deaths
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("deaths")}</div>
    ),
  },
  {
    accessorKey: "assists",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assists
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("assists")}</div>
    ),
  },
  {
    accessorKey: "kda",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          KDA
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">
        {Math.round(Number(row.getValue("kda")) * 100) / 100}
      </div>
    ),
  },
  {
    accessorKey: "killParticipation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          KP
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">
        {Math.round(Number(row.getValue("killParticipation")) * 100) / 100}%
      </div>
    ),
  },
  {
    accessorKey: "wins",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Win
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("wins")}</div>
    ),
  },
  {
    accessorKey: "losses",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lose
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("losses")}</div>
    ),
  },
  {
    accessorKey: "winRate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Winratio
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">
        {Math.round(Number(row.getValue("winRate")) * 100) / 100}%
      </div>
    ),
  },
  {
    accessorKey: "games",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Games
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("games")}</div>
    ),
  },
];
