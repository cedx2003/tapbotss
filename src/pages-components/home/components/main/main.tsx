"use client";
import Image from "next/image";
import {
  CongratulationsModal,
  Header,
  Timer,
  RangeMoneyModal,
  VoteButton,
  YourTopPickModal
} from "./components";
import styles from "./main.module.css";
import { NEW_GAMES } from "@/mock/games";
import React, { useRef, useEffect, useState } from "react";
import backgroundImage from "../../../../../public/images/welcome-bg.png";
import NextBgImage from "next-bg-image";
import {userStore, gameStore, tmpbetStore, boardStore} from '../../../../stores/store'

export const Main = () => {
  type UserGroup = {
    user: string;
    id?: number;
    img?: string;
    count: number;
    index: number;
  }

  type GameStatus = {
    round: number;
    groups: UserGroup[];
  }
  const bets = boardStore((state) => state.bets);
  const setPlayer = tmpbetStore((state) => state.setPlayer);
  const setPlayerId = tmpbetStore((state) => state.setPlayerId);

  const gameStatus = gameStore((state: { gameStatus: Array<GameStatus> }) => state.gameStatus);
  const roundId = gameStore((state) => state.roundId);
  const isFirst = userStore((state) => state.isFirst);
  const [currentRound, setCurrentRound] = useState(0);
  const [open, setOpen] = useState(false);
  const [depozet, setDepozet] = useState(false);
  const [yourPick, setYourPick] = useState(isFirst);
  const id = userStore((state) => state.id);

  const handleBet = (player: any) => {
    setPlayer(player?.user);
    setPlayerId(player?.id);
    setDepozet(true);
  };

  const isExist = (id: any) =>{
    for(var i=0;i<bets.length;i++){
      if(bets[i].id == id) return true;
    }
    return false;
  }
  console.log("home page and roundId", roundId)

  const updatePoints = () =>
    {
      const points = userStore((state) => state.points);
      fetch("https://lovetap-backend.vercel.app/user/updatePoints/", {
      // fetch("http://localhost:4000/user/updatePoints/", {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          points: points
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then(data => {
        console.log("return data ===> ", data)
        // setPoint(data.point);
        // if(data.point > point) console.log("seems error:", data.point)
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with your fetch operation:', error);
      });
    }
  
    useEffect(() => {
      setInterval(() => updatePoints(), 30000);
    }, []);

  return (
    <NextBgImage
      src={backgroundImage}
      className={`w-full pb-[70px] h-full min-h-screen relative`}
    >
      <Header />
      <div className="px-4 my-4">
        <div className="scrollbar-hide overflow-x-auto flex gap-x-[75px]">
          {gameStatus.map((_, index) => (
            <div key={index} className="flex text-[#FCFCFC]  gap-x-1" onClick={() =>setCurrentRound(index)}>
              <p
                className={` ${
                  index === currentRound ? "font-[700] text-base" : "font-normal text-sm"
                } leading-[16.8px] tracking-[-0.40799999237060547px] text-right`}
              >
                ROUND
              </p>
              <p
                className={`${
                  index === currentRound ? "font-[700] text-base" : "font-normal text-sm"
                } leading-[16.8px] tracking-[-0.40799999237060547px] text-right`}
              >
                {index + 1}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-[16px]">
        <p className="text-sm mt-[13px] font-normal leading-[16.8px] tracking-[-0.40799999237060547px] text-left text-[#FCFCFC]">
          { currentRound + 1 == roundId ? "Choose which woman you think will win." : "Round has not started yet."}
        </p>
        {currentRound + 1 == roundId ? <Timer type={"end"}/> : ( currentRound + 1 == roundId + 1 ? <Timer type={"start"}/> : null)}
      </div>
      <div className="flex pl-[50px] max-w-full py-[20px] pt-[30px] scrollbar-hide overflow-x-auto h-full">
        {gameStatus.slice(roundId-1, roundId+1).map((round, roundIndex) => (
          currentRound + 1 == roundId && <div
            key={roundIndex}
            className="flex justify-around gap-y-[50px] flex-col"
          >
            {round.groups.map((player: any, playerIndex: number) => (
              <div key={playerIndex} className="flex items-center h-full ">
                {roundIndex !== 0 && (
                  <div className="pr-[15px] py-[18px] flex items-center mr-[25px] relative h-[55%] rounded-r-[8px] border-b border-b-[#CBC7C8] border-t border-t-[#CBC7C8] border-r border-r-[#CBC7C8] pl-[9.5px]">
                    <div className="h-[1px] absolute right-[-30px] top-1/2  w-[30px] bg-[#957EAA]"></div>
                  </div>
                )}
                <div className="flex h-full items-center">
                  <div className="flex flex-col gap-y-4 items-center">
                    <div className="w-[120px] relative h-[120px] rounded-[4px] bg-white">
                      <Image
                        src={roundId == roundIndex + 1 ? "/avatars/avatar-"+ (player?.id + 1) +".png" : "/images/question.png"}
                        alt="avatar"
                        width={120}
                        height={120}
                        className={`${isExist(player?.id) ? `rounded-[4px] border-[4px] border-[#9454B7]` : null}`}
                      />
                      {roundId === roundIndex + 1 && <VoteButton womenId = {player?.id} />}
                    </div>
                    {roundId === roundIndex + 1 ? (
                      <button
                        onClick={() =>
                          handleBet(player)
                        }
                        disabled={isExist(player?.id)}
                        className={`${styles.button_bg} ${isExist(player?.id) ? styles.button_disabled: null } drop-shadow-md text-[14px] w-[120px] font-semibold leading-[13.2px] tracking-[-0.40799999237060547px] text-center  rounded-[45px]  py-[8px]  text-[#FCFCFC]`}
                      >
                        BET ON {player?.user}
                      </button>
                    ) : (
                      <>
                        {roundIndex === 0 && <div className="py-[8px]"></div>}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Image
        src={"/images/tournoment-assent-image.png"}
        alt="img"
        width={80}
        height={150}
        className="absolute top-[168px] right-0"
      />
      <Image
        width={135}
        height={98}
        alt="img"
        src={"/images/tournoment-assent-image-2.png"}
        className="absolute bottom-0 right-12"
      />
      <CongratulationsModal open={open} close={() => setOpen(false)} />
      <RangeMoneyModal close={() => setDepozet(false)} open={depozet}/>
      <YourTopPickModal open={yourPick} close={() => setYourPick(false)} />
    </NextBgImage>
  );
};
