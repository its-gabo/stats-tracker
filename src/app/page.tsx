"use client";

import { StatsTable } from "@/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Home() {
  const [statsData, setStatsData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { isLoading: isLoadingStatsData, data } = useQuery({
    queryKey: ["statsData"],
    queryFn: async () => axios.get("/api/stats").then((res) => res.data),
  });

  React.useEffect(() => {
    if (!isLoadingStatsData && data) {
      setStatsData(data);
      setIsLoading(false);
    }
  }, [data, isLoadingStatsData]);

  if (isLoading) {
    return (
      <div className="h-screen w-full grid place-items-center">
        <LoaderCircle size={32} className="animate-spin" />{" "}
      </div>
    );
  }

  return (
    <main className="w-4/5 m-auto py-12">
      <h1 className="text-center text-4xl">Stats Tracker</h1>
      <StatsTable statsData={statsData} />
    </main>
  );
}
