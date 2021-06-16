const express = require('express')
const process = require('process')
const app = express()
const port = process.env.PORT || 3000
var os = require('os')
var Twitter = require('twitter');
require('dotenv').config()


// #################
//  Helpers / Utils
// #################

/**
 * Measure data about the CPU usage.
 * @return {Object} The idle (unused CPU capacity) and total (CPU usage capacity).
 */
function cpuAverage() {

    // Initialise CPU info
    var totalIdle = 0, totalTick = 0;
    var cpus = os.cpus();
  
    // Loop through CPU cores and colect data
    for(var i = 0, len = cpus.length; i < len; i++) {
        var cpu = cpus[i];
        for(type in cpu.times) {
            totalTick += cpu.times[type];
     }     
      totalIdle += cpu.times.idle;
    }
    // Return the average
    return {idle: totalIdle / cpus.length,  total: totalTick / cpus.length};
  }


/**
 * Calculate the CPU usage of the device.
 * @param  startCpu The first measure of the cpu.
 * @return {Number} The cpu usage of the device in percentage.
 */
function cpuCalc(startCpu, endCpu) {
    // Calculate the cpu usage
    var idleDiff = endCpu.idle - startCpu.idle;
    var totalDiff = endCpu.total - startCpu.total;
    var cpuPercent = 100 - ~~(100 * idleDiff / totalDiff);
    return cpuPercent;
}


// #################
//     endpoints
// #################

/**
 * health endpoint - presents data about the service.
 */
app.get('/health', (req, res) => {
    // Measure the start-cpu performances
    var startCpu = cpuAverage();

    // Delay:
    var timer = setTimeout(() => {
        // Get second-measure of the cpu, and calculate the CPU usage
        var endCpu = cpuAverage();
        var cpuPercent = cpuCalc(startCpu, endCpu);

        // Send 'health' data back to the client
        res.send({'OS Name': process.platform, 
        'NodeJS Version': process.versions.node, 
        'Memory Usage (%)': 100 - ~~((os.freemem() / os.totalmem()) * 100),
        'CPU Usage (%)': cpuPercent});
    }, 100);
})


/**
 * tweets endpoint - using Twiter API to present the 10 latests tweets using the given query (YOUR_STRING).
 * Usage: /tweets?query=YOUR_STRING
 * If the query is 
 */
app.get('/tweets', (req, res) => {
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        bearer_token: process.env.TWITTER_BEARER_TOKEN
    });

    client.get('search/tweets', {q: req.query.query , count: 10}, function(error, tweets, response){
        if (error) {
            res.status(400).json({error: "Invalid query detected"})
            return;
        }
        // console.log(tweets);
        res.send(tweets);
    });         
})

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
})