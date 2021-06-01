import { sortScorers } from './scoreboard.utils'
const testArray = [
    { username: "Gourav", score: 7, genre: 'ipl' },
    { username: "Sourav", score: 1, genre: 'react' },
    { username: "Ravi", score: 9, genre: 'marvel' }
];
const resultArray = [
    { username: "Ravi", score: 9, genre: 'marvel' },
    { username: "Gourav", score: 7, genre: 'ipl' },
    { username: "Sourav", score: 1, genre: 'react' }
];
test("Should sort user data with respect to score", () => {
    const result = sortScorers(testArray);
    expect(result).toEqual(resultArray);
});
