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
    friends: User[];
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
    from: DBID;
    words: Word[];
    shared: boolean;
    public: boolean;
    stars: DBID[]; // User
}

export interface UsersWordLists {
    id: DBID;
    user: DBID;
    wordList: DBID;
}

export interface Lobby {
    id: DBID;
    players: DBID[]; // User
    customWords: string[]; // Only for this lobby, everything else in wordlist
    wordLists: WordList[];
    gameRules: GameRules;
    token: string;
    public: boolean;
    gameStarted: boolean;
    lobby?: DBID;
    rounds: number;
    gameEvents: GameEvent[];
}

export interface GameRules {
    id: DBID;
    maxRounds: number; // Default 4
    maxPlayers: number; // Default 4
    timeLimited: boolean;
    timeLimit: number; // In seconds
    allowSpecialGameMode: boolean; // Later features
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
    VotedAbstain,
    ReceivedUpVote,
    ReceivedDownVote,
}

export interface GameEvent {
    id: DBID;
    from: DBID; // User
    triggered: Date;
    type: GameEventType; // its a number
    lobby: DBID;
}
