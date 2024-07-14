import React, { useEffect, useState } from 'react';
import './FlipClock.css';
import {gameStore} from '../../../../../../stores/store';


const Digit = ({ group, num }) => {
  const [prevNum, setPrevNum] = useState(num);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (num !== prevNum) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
        setPrevNum(num);
      }, 350);
    }
  }, [num, prevNum]);

  return (
    <div className={`digit relative ${group}`} data-num={num}>
      <span className="base">{num}</span>
      {isFlipping && (
        <>
          <div className="flap over front" data-content={prevNum}></div>
          <div className="flap over back" data-content={num}></div>
          <div className="flap under" data-content={num}></div>
        </>
      )}
      <div className='h-[2px] w-full bg-[#A559B7] absolute left-0  top-1/2' />
      <div className='absolute w-[6px] h-[6px] rounded-full bg-[#A559B7] right-[-4px] top-[33%] translate-y-1/2' />
      <div className='absolute w-[6px] h-[6px] rounded-full bg-[#A559B7]  left-[-4px] bottom-1/2 translate-y-1/2' />
    </div>
  );
};

export const FlipClock = () => {
  const [time, setTime] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  const endAt = gameStore((state) => state.endAt);
  var remainTime = endAt;
  const setEndAt = gameStore((state) => state.setEndAt);
  useEffect(() => {
    const updateTime = () => {
      const totalSeconds = Math.floor(remainTime / 1000);
      remainTime -= 1000;
      const days = Math.floor(Math.floor(totalSeconds / 3600) / 24);
      const hours = Math.floor(totalSeconds / 3600) % 24;
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      // console.log(hours + " " + minutes + " " + seconds);

      setEndAt(remainTime);
      setTime({
        days: String(days).padStart(2,'0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex z-[999] max-w-[200px] items-center gap-x-1' >
      <Digit group="tenday" num={time.days[0]} />
      <Digit group="day" num={time.days[1]} />
      <div className='text-white text-[32px] font-normal leading-[36.06px] tracking-[-0.085em] text-center'  >:</div>
      <Digit group="tenhour" num={time.hours[0]} />
      <Digit group="hour" num={time.hours[1]} />
      <div className='text-white text-[32px] font-normal leading-[36.06px] tracking-[-0.085em] text-center'  >:</div>
      <Digit group="tenmin" num={time.minutes[0]} />
      <Digit group="min" num={time.minutes[1]} />
      <div className='text-white text-[32px] font-normal leading-[36.06px] tracking-[-0.085em] text-center' >:</div>
      <Digit group="tensec" num={time.seconds[0]} />
      <Digit group="sec" num={time.seconds[1]} />
    </div>
  );
};

export default FlipClock;

