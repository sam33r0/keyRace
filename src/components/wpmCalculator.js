import throttle from "../utils/throttle";
let prevTyped = 0;
let delay = 750
const calculateWpm = throttle((par, opp, ind, setWpm) => {
    // console.log('testing throttle and module', ind);
    const correctCharacters = par.reduce((agr, e, i, arr) => {
        if (e === opp[i])
            return 1 + agr;
        return agr;
    }, 0)
    const wpm = Number.parseInt((correctCharacters - prevTyped) * 60 * 1000 / (5 * delay));
    prevTyped = correctCharacters
    setWpm(wpm);
    return wpm;

}, delay)
const resetPrevTyped = () => {
    prevTyped = 0;
}
export {
    resetPrevTyped
}
export default calculateWpm;