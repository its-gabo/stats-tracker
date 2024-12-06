"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React from "react";

export default function AdminPage() {
  const [isVerified, setIsVerified] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const [nickname, setNickname] = React.useState("");
  const [kills, setKills] = React.useState(0);
  const [deaths, setDeaths] = React.useState(0);
  const [assists, setAssists] = React.useState(0);
  const [killParticipation, setKillParticipation] = React.useState(0);

  const [isWin, setIsWin] = React.useState(false);

  React.useEffect(() => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsVerified(true);
    }
  }, [password]);

  const handleInputValue = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!nickname) return;

    const data = {
      nickname,
      kills,
      deaths,
      assists,
      killParticipation,
      isWin,
    };

    await axios.post("/api/stats/per-game", data);

    setKills(0);
    setDeaths(0);
    setAssists(0);
    setKillParticipation(0);
    setIsWin(false);
    setNickname("");
  };

  if (!isVerified) {
    return (
      <div className="grid place-items-center h-screen w-full">
        <div className="w-3/5">
          <p>Enter Password</p>
          <Input defaultValue={password} onChange={handleInputValue}></Input>
        </div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="w-4/5 m-auto">
        <div className="flex gap-2 mb-2">
          <div>
            <p>Nickname</p>
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.currentTarget.value)}
            />
          </div>
          <div>
            <p>Kills</p>
            <Input
              type="number"
              value={kills}
              onChange={(e) => setKills(Number(e.currentTarget.value))}
            />
          </div>
          <div>
            <p>Deaths</p>
            <Input
              type="number"
              value={deaths}
              onChange={(e) => setDeaths(Number(e.currentTarget.value))}
            />
          </div>
          <div>
            <p>Assists</p>
            <Input
              type="number"
              value={assists}
              onChange={(e) => setAssists(Number(e.currentTarget.value))}
            />
          </div>
          <div>
            <p>Kill Participation</p>
            <Input
              type="number"
              value={killParticipation}
              onChange={(e) =>
                setKillParticipation(Number(e.currentTarget.value))
              }
            />
          </div>
          <div>
            <p>Win</p>
            <Checkbox
              checked={isWin}
              onCheckedChange={(checked) => setIsWin(!!checked)}
              className="h-9 w-9"
            />
          </div>
        </div>
        <div>
          <Button className="w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
