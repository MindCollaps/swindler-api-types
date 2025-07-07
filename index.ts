import type { GameRules } from "./db";
export type DBID = number;

export let DefaultGameRules: GameRules = {
    id: 0,
    allowSpecialGameMode: false,
    lobby: 0,
    maxPlayers: 4,
    maxRounds: 4,
    membersCanAddCustomWordLists: false,
    membersCanAddWordLists: false,
    rounds: 4,
    timeLimited: false,
}