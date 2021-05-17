import { sortScorers } from './scoreboard.utils'
const testArray = [
    { name: "Gourav", score: 7, genre: 'ipl' },
    { name: "Sourav", score: 1, genre: 'react' },
    { name: "Ravi", score: 9, genre: 'marvel' }
];
const resultArray = [
    { name: "Ravi", score: 9, genre: 'marvel' },
    { name: "Gourav", score: 7, genre: 'ipl' },
    { name: "Sourav", score: 1, genre: 'react' }
];
test("Should sort user data with respect to score", () => {
    const result = sortScorers(testArray);
    expect(result).toEqual(resultArray);
});
