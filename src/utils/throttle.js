const throttle = function (cb, d = 500) {
    let prev = 0;
    return function (...arg) {
        let now = Date.now();
        if (now - prev < d)
            return;
        prev = now;
        return cb(...arg);
    }
}

export default throttle;