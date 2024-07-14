"use client";
import { ArrowUpIcon } from "@/icons";
import styles from "./active-wager.module.css";
import { boardStore, gameStore, womens } from "../../../../stores/store";

export const ActiveWager = () => {

  const bets = boardStore((state) => state.bets);
  const gameStatus = gameStore((state) => state.gameStatus);  
  const RoundId = gameStore((state) => state.RoundId);
  
  const getPair = (id:any) => {
    var index =0;
    var index1 = 0;
    for(var i=0;i< gameStatus[RoundId-1].groups.length;i++){
      if(gameStatus[RoundId-1].groups[i].id == id){
        index = i;
        if(i%2 == 0) index1 = i+1;
        else index1 = i-1;
        break;
      }
    }
    var pairId = gameStatus[RoundId-1].groups[index1].id;
    if(index<index1) 
      return {
        firstId: id,
        secondId: pairId
      };
    else
      return {
        firstId: pairId,
        secondId: id
      };
  }
  
  const getNamefromid = (id:any) => {
    for(var i=0;i<womens.length;i++){
      if(womens[i].id == id) return womens[i].name;
    }
  }
  return (
  <div className="w-full px-[18px] pt-6">
    <div className="flex items-center justify-between">
      <h1 className="text-[19px] font-bold text-white leading-[22.99px] text-left">
        Wagers to Bets
      </h1>
      <button className={styles.text}>See all</button>
    </div>
    <div className="flex flex-col gap-y-4 mt-4">
      {bets.map((bet : any, index : any) => (
        <div
          key={index}
          className="pt-[17px] rounded-[20px] pl-[22px] pb-[22px] pr-[23px] border border-solid border-[#FFFFFF80]"
        >
          <div className="flex justify-between">
            <p className=" text-white text-base font-medium leading-[19.2px] tracking-[-0.40799999237060547px] text-left">
              Match {Math.floor(bet.id/2) + 1}:
            </p>
            <ArrowUpIcon className="text-[#E9E4E69C]" />
          </div>
          <div className="mt-[10px]">
            <p className="text-base font-medium leading-[19.2px] tracking-[-0.40799999237060547px] text-left text-white">{`${getNamefromid(getPair(bet.id).firstId)} vs. ${getNamefromid(getPair(bet.id).secondId)} - ${bet.betAmount} points`}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};
