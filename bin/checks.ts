const healthCheck = () => {
    // TODO Ping check
    return true;
};

const latencyCheck = () => {
    // TODO Latency check
    return true;
};

const runChecks = () => {
    healthCheck();
    latencyCheck();
};

runChecks();
