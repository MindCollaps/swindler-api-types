import type { FlaggedWord, Game, GameEventType, GameRules, Lobby, User, Word, WordList } from "./db";
import type { DBID } from ".";

export interface DefaultDataRes<T> {
    data: T;
}

export interface DefaultStatusRes {
    status: number;
    message: string;
}

export interface DefaultIdReq {
    id?: DBID;
}

export type AsCreateDatabaseObject<T> =
  // Ignore Date objects: leave as-is
  T extends Date ? T :
  // If T is an array, apply recursively to array elements
  T extends Array<infer U> ? Array<AsCreateDatabaseObject<U>> :
  // If T is an object with 'id', omit 'id' and recurse on properties
  T extends object ? {
    [K in keyof T as K extends "id" ? never : K]: AsCreateDatabaseObject<T[K]>
  } :
  // Otherwise, leave as-is (primitives, etc.)
  T;

export type DefaultPostReq<T extends { id: DBID }> = Omit<T, "id">;
export type DefaultUpdateReq<T extends { id: DBID }> = Partial<T> & Required<Pick<T, 'id'>>;


// GETTER
export interface GetUserReq extends DefaultIdReq {}
export interface GetUserRes extends DefaultDataRes<User> {}


export interface GetWordlistsReq extends DefaultIdReq {}
export interface GetWordlistsRes extends DefaultDataRes<WordList[]> {}


// --WORDS--
export interface AddWordReq extends DefaultPostReq<Word> {}

export interface AddWordToListReq {
    word: DBID;
    wordList: DBID;
}

export interface FlagWordReq extends DefaultPostReq<Omit<FlaggedWord, 'word'> & { word: DBID }> {}


// --GAME--

// Lobby Functions
export interface MakeLobbyReq {
    user: DBID;
}

export interface UserJoinLobbyReq {
    token: string;
    user: DBID;
}
export interface UserJoinLobbyRes extends DefaultDataRes<Lobby>, DefaultStatusRes {}

export interface UserRemoveLobbyReq {
    user: DBID;
}

export interface UpdateGameRuleReq extends DefaultUpdateReq<GameRules> {}

export interface StoreGameEventReq {
    lobby: DBID;
    eventType: GameEventType;
    from: DBID;
}

export interface AddWordListToLobbyReq {
    wordList: DBID;
    lobby: DBID;
}

export interface NextGameReq {
    game: DBID;
}

export interface GameResultsReq {
    lobby: DBID;
}

export interface GameResultsRes {
    mostVotedCorrectly: DBID;
    mostVotedIncorrectly: DBID;
    mostVotedAbstain: DBID;
    mostUpVotesGot: DBID;
    mostDownVotesGot: DBID;
    votedTheMost: DBID; // Who voted the most time, like clicked on down or upvote
    mostPositive: DBID; // Who gave the most upvotes
    mostNegative: DBID; // Who gave the most downvotes
}

// Game Functions
export interface NewGameReq {
    game: DBID;
}
export interface NewRoundRes extends DefaultDataRes<Game>, DefaultStatusRes {}

export interface GameFinishedReq {
    game: DBID;
}