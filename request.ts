import type { User } from "./db";

export interface DefaultRes<T> {
    data: T;
}

export interface GetUserReq {
    id?: number;
}

export interface GetUserRes extends DefaultRes<User> {}
