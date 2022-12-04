import { Score } from './scoreboard.types';
export function sortAndManageScores(localArray: Score[]) {
    const sortedScores = localArray.sort((a: Score, b: Score) => b.score - a.score);
    if (sortedScores.length < 10)
        return sortedScores
    return sortedScores.slice(0, 10)
}