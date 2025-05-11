export interface ILeetCodeResponse {
    matchedUser: IMatchedUser
}

export interface IMatchedUser {
    profile: {
        reputation: number,
        ranking: number
    },
    submitStats: {
        acSubmissionNum: ISubmissionNum[]
    }
}

export interface ISubmissionNum {
    difficulty: string,
    count: number
}

export interface ILeetCodeStats {
    reputation: number,
    ranking: number,
    acSubmissionNum: ISubmissionNum[]
}