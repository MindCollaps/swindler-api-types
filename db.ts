import type { DBID } from ".";

export interface User {
    id: DBID;
    username: string;
    password: string;
    email: string;
    emailVerified: boolean;
    xp: number;
    level: number;
    gamesPlayed: number;
    friends: DBID[];
    admin: boolean;
    playedWords: DBID[] // Word
}

export interface Word {
    id: DBID;
    word: string;
    isCustom: boolean;
    from?: DBID; // User
}

export interface FlaggedWord {
    id: DBID;
    reporter: DBID; // User
    word: Word;
    reason: number; // 0=offensive,1=not usable,2=not fun,3=word is wrong (written weridly)
    message?: string;
}

export interface WordList {
    id: DBID;
    from?: DBID; // User
    words: Word[];
    shared: boolean;
    public: boolean;
    system: boolean; // Is predefined word list
    stars: DBID[]; // User
}

export interface UsersWordLists {
    id: DBID;
    user: DBID;
    wordList: DBID;
}

export interface Lobby {
    id: DBID;
    founder: DBID; // User
    founded: Date;
    players: DBID[]; // User
    wordLists: WordList[];
    gameRules: GameRules;
    token: string;
    public: boolean;
    gameStarted: boolean;
    game?: DBID;
    round: number; // Number of games played
    gameEvents: GameEvent[];
}

export interface GameRules {
    id: DBID;
    maxRounds: number; // Default 4 - rounds in one game, how often everyone can say one word
    rounds: number; // Default 4 - how many different games will be played
    maxPlayers: number; // Default 4
    timeLimited: boolean;
    timeLimit?: number; // In seconds
    allowSpecialGameMode: boolean; // Later features
    membersCanAddWordLists: boolean; // Default false
    membersCanAddCustomWordLists: boolean; // Default false
    lobby: DBID;
}

export interface Game {
    id: DBID;
    lobby: Lobby;
    round: number;
    turn: number; // Number from 0 - (lobby.players.length -1) telling the game whos turn it is as index of lobby.players[]
    word: Word;
    imposter: DBID; // User
    specialGameMode: number; // Later features
}

export enum GameEventType {
    VotedCorrectly,
    VotedIncorrectly,
    VotedAbstain, // from: voted abstain, to: does not exist
    ReceivedUpVote, // from: who voted, to: received up vote
    ReceivedDownVote, // from: who voted, to: received up vote
}

export interface GameEvent {
    id: DBID;
    from: DBID; // User
    to?: DBID; // User receiving the event...FROM "down voted" TO
    triggered: Date;
    type: GameEventType; // its a number
    lobby: DBID;
}
