import { localdata } from './Scoreboard';
export function sortScorers(localArray: localdata[]) {
    return localArray.sort((a: localdata, b: localdata) => b.score - a.score)
}