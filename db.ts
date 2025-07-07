import type { DBID } from ".";
import type { AsCreateDatabaseObject } from "./request";

export interface User {
    id: DBID;
    username: string;
    password: string;
    email: string;
    emailVerified: boolean;
    xp: number;
    level: number;
    gamesPlayed: number;
    userFriends: DBID[];
    friendOf: DBID[];
    admin: boolean;
    
    playedWords: DBID[];
    staredWordLists: DBID[];
    foundedLobbies: DBID[];
    flaggedWords: DBID[];
    ownedWordLists: DBID[];
    initiatedEvents: DBID[];
    receivedEvents: DBID[];
}

export interface StarredList {
    id: DBID;
    wordlistId: DBID;
}

export interface UserFriends {
    id: DBID;
    userId: DBID;
    friendId: DBID;
    createdAt: Date;
    status: string;
}

export interface Word {
    id: DBID;
    word: string;
    isCustom: boolean;
    fromUserId?: DBID; // User
    worldLists: WordList[];
    flagged:    FlaggedWord[];
    games:      Game[];
}

export interface FlaggedWord {
    id: DBID;
    reporter: DBID; // User
    wordId: DBID;
    word: Word;
    reason: number; // 0=offensive,1=not usable,2=not fun,3=word is wrong (written weridly)
    message?: string;
    reporterUserId?: DBID;
}

export interface WordList {
    id: DBID;
    founderId?: DBID; // User
    words: Word[];
    shared: boolean;
    public: boolean;
    system: boolean; // Is predefined word list
    stars: DBID[]; // User
    usersWorldLists: User[];
}

export interface Lobby {
    id: DBID;
    founder: User; // User
    founded: Date;
    players: User[]; // User
    token: string;
    public: boolean;
    gameStarted: boolean;
    gameId?: DBID;
    round: number; // Number of games played
    wordLists: WordList[];

    gameRules?: GameRules;
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
    lobbyId: DBID;
}

export interface Game {
    id: DBID;
    lobbyId: Lobby;
    round: number;
    turn: number; // Number from 0 - (lobby.players.length -1) telling the game whos turn it is as index of lobby.players[]
    word?: Word;
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
    initiatorId: DBID; // User
    receiverId?: DBID; // User receiving the event...FROM "down voted" TO
    triggered: Date;
    type: GameEventType; // its a number
    lobbyId: DBID;
}
