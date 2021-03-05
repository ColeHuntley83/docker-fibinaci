const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const pgUser = process.env.PGUSER;
const pgHost = process.env.PGHOST;
const pgDatabase = process.env.PGDATABASE;
const pgPassword = process.env.PGPASSWORD;
const pgPort = process.env.PGPORT;

module.exports = {
    redisHost,
    redisPort,
    pgUser,
    pgHost,
    pgDatabase,
    pgPassword,
    pgPort
}