import 'dotenv/config';
import { LeetcodeSerializer } from '../helpers/leetcode.serializer.js';

export async function getLeetCodeStats () {
    const username = process.env.LEETCODE_USERNAME;
    const url = process.env.LEETCODE_URL || 'https://leetcode.com/graphql';
    const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        profile {
          reputation
          ranking
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

    const body = {
        operationName: 'userProfile',
        variables: { username },
        query,
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return LeetcodeSerializer.deserializeLeetcodeData(data.data);
    } catch (err: any) {
        throw new Error(`Error fetching LeetCode data: ${err.message}`);
    }
}