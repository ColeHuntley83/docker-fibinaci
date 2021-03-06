const keys = require("./keys");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());


const {Pool} = require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});
pgClient.on('connect', async() => {
    try{
    //const drop = await pgClient.query('DROP TABLE IF EXISTS values CASCADE');
    const result = await pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')

    }
    catch(err) {
        console.log(err)
    }
  });
  //redis client setup

  const redis = require('redis');
  const redisClient = redis.createClient({
      host: keys.redisHost,
      port: keys.redisPort,
      retry_strategy: ()=> 1000
  });
  const redisPublisher = redisClient.duplicate();
  
  //express route handlersz

  app.get("/", (req, res)=> {
      res.send("hi");
  });

  app.get("/values/all", async(req, res)=> {
      try {
    const values = await pgClient.query('SELECT * from values');
    res.send(values.rows);
      }
      catch(err) {
          console.log("Select error", err);
          res.send([])
      }
  });

  app.get('/values/current', async(req, res)=> {
    redisClient.hgetall('values', (err, values)=> {
        res.send(values);
    });
  });

  app.post('/values', async(req, res)=> {
    const index = req.body.index;

    if (parseInt(index) > 100) {
        return res.status(422).send("index to high")
    }
    redisClient.hset('values', index, "Nothing yet!!!");
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(number) values($1)', [index]);
    res.send({working: true})
  });

  app.listen(5000, ()=> console.log("listening on port 5000"))