import { create } from 'zustand'

export const userStore = create((set) => ({
  id: 0,
  username: "",
  points: 0,
  topPick: 0,
  isFirst: true,
  avatar: "",
  votes: [],
  setId: (id) => set({id:id}),
  setavatar: (avatar) => set({avatar:avatar}),
  setUsername: (username) => set({ username: username }),
  setTopPick: (topPick) => set({ topPick: topPick }),
  setPoints: (points) => set({ points: points }),
  addPoint: (points) => set((state) => {
    console.log("point added!!")
    return { points: state.points + 1}
  }),
  setIsFirst: (isFirst) => set({isFirst : isFirst}),
  setVotes: (votes) => set({votes: votes}), 
  addVote: (womenId) => set((state) => {
        const newVotes = [...state.votes];
        if (newVotes[womenId] !== undefined) {
            newVotes[womenId]++;
        }
        return { votes: newVotes };
    })
}))

export const womens = [
    {
        "id": 0,
        "name": "Amanda"
    },
    {
        "id": 1,
        "name": "Marsha"
    },
    {
        "id": 2,
        "name": "Stella"
    },
    {
        "id": 3,
        "name": "Lusy"
    },
    {
        "id": 4,
        "name": "Emma"
    },
    {
        "id": 5,
        "name": "Becky"
    },
    {
        "id": 6,
        "name": "Victoria"
    },
    {
        "id": 7,
        "name": "Annet"
    },
    {
        "id": 8,
        "name": "Amanda"
    },
    {
        "id": 9,
        "name": "Anna"
    },
    {
        "id": 10,
        "name": "Marsha"
    },
    {
        "id": 11,
        "name": "Stella"
    },
    {
        "id": 12,
        "name": "Lusy"
    },
    {
        "id": 13,
        "name": "Emma"
    },
    {
        "id": 14,
        "name": "Emma"
    },
    {
        "id": 15,
        "name": "Becky"
    },
    {
        "id": 16,
        "name": "Victoria"
    },
    {
        "id": 17,
        "name": "Annet"
    },
    {
        "id": 18,
        "name": "Anna"
    },
    {
        "id": 19,
        "name": "Amanda"
    },
    {
        "id": 20,
        "name": "Marsha"
    },
    {
        "id": 21,
        "name": "Stella"
    },
    {
        "id": 22,
        "name": "Lusy"
    },
    {
        "id": 23,
        "name": "Emma"
    },
    {
        "id": 24,
        "name": "Becky"
    },
    {
        "id": 25,
        "name": "Victoria"
    },
    {
        "id": 26,
        "name": "Annet"
    },
    {
        "id": 27,
        "name": "Anna"
    },
    {
        "id": 28,
        "name": "Amanda"
    },
    {
        "id": 29,
        "name": "Marsha"
    },
    {
        "id": 30,
        "name": "Stella"
    },
    {
        "id": 31,
        "name": "Lusy"
    },
  ];

export const selectStore = create((set) => ({
  name: "",
  id: 0,
  src: "",
  setName : (name) => set( { name:name} ),
  setSrc : (src) => set( {src:src} ),
  setId : (id) => set( {id:id} ),
}))
export const gameStore = create((set) => ({
    roundId: 1,
    endAt: 0,
    gameStatus: [],
    setEndAt: (endAt) => set({endAt : endAt}),
    setRoundId: (roundId) => set({roundId : roundId}),
    setGameStatus: (gameStatus) => set({gameStatus : gameStatus}),
}))

export const tmpbetStore = create((set) => ({
  player:"",
  playerid: 0,
  betAmount: 1,
  setbetAmount: (betAmount) => set({betAmount : betAmount}),
  setPlayer: (player) => set({player : player}),
  setPlayerId: (playerid) => set({playerid : playerid}),
}))

export const betStore = create((set) => ({
  player:"",
  setPlayer: (player) => set({player : player}),
}))

export const boardStore = create((set) =>({
  bets : [],
  setBet: (bets) => set({bets:bets}),
}))