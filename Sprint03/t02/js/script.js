class Timer {
    constructor(id, delay, stopCount) {
        this.id = id;
        this.delay = delay;
        this.stopCount = stopCount;
    }

    start() {
        console.log("Timer " + this.id + " started (delay=" + this.delay + ", stopCount=" + this.stopCount + ")");
        this.stopCount--;
    }

    tick() {
        console.log("Timer " + this.id + "Tick! | cycles left " + this.stopCount);
        this.stopCount--;
    }

    stop() {
        console.log("Timer " + this.id + " stopped");
    }
}

function runTimer(id, delay, stopCount) {
    let timer = new Timer(id, delay, stopCount);

    let timerId = setInterval(ticker, delay);

    timer.start();
    function ticker() {
        timer.tick();
        if (timer.stopCount === -1) {
            timer.stop();
            clearInterval(timerId);
        }
    }
}



runTimer("Bleep", 1000, 5);