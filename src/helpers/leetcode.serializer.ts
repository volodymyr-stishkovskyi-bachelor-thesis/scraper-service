import { ILeetCodeResponse, ILeetCodeStats, ISubmissionNum } from "../interfaces/leetcode-response.interface.js";

export class LeetcodeSerializer {
    static deserializeLeetcodeData (data: ILeetCodeResponse): ILeetCodeStats {
        const { matchedUser } = data;
        const { profile, submitStats } = matchedUser;

        return {
            reputation: profile.reputation,
            ranking: profile.ranking,
            acSubmissionNum: submitStats.acSubmissionNum.map((item: ISubmissionNum) => ({
                difficulty: item.difficulty,
                count: item.count,
            })),
        };
    }
}