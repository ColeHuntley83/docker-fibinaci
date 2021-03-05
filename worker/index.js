const keys = require("./keys");
const redis = require("redis");



const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: ()=> 1000
});
const sub = redisClient.duplicate();

const fib = (index)=> {
    if (index<2)  {
        return 1;
    };
    return fib(index -1 ) + fib(index - 2)
};

const fibMaster = (num)=> {
    const value = fib(num);
    console.log("Worker Done calculating Fib");
    return value;
}

sub.on('message', (channel, message)=> {
    console.log("message", message)
    redisClient.hset('values', message, fibMaster(parseInt(message)))
});
sub.subscribe('insert');