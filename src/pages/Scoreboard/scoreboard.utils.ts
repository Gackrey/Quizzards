import { Score } from './scoreboard.types';
export function sortScorers(localArray: Score[]) {
    return localArray.sort((a: Score, b: Score) => b.score - a.score)
}