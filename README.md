[![npm version](https://badge.fury.io/js/node-request-context.svg)](http://badge.fury.io/js/node-request-context/)

# Healthytweets
## Overview
An implemented [Autodesk Intern Home Assignment](https://gist.github.com/guyguyon/f33f8cbd0fa2216d133070e9437f628a). The task includes writing a simple service and deploying it to Heroku with a Docker container.
  
## Serivce Details
The service has 2 endpoints:
1. __Health Service__ (GET /health):
   * Return a health check for the service in _JSON_ format - OS Name, NodeJS Version, Memory Usage (%), CPU Usage (%).  
2. __Twitter Service__ (GET /tweets?query=YOUR_STRING):
   * Get a string (_YOUR_STRING_) and return the 10 latest tweets from Twiter API, in _JSON_ format. 
   
  
## Healthytweets in Heroku
If you would like to run the closed-service online follow the instructions below.
  
### The Heroku API
The service is hosted [here](https://healthytweets.herokuapp.com/). click the link, or copy the link below to your browser:
   ```sh
   https://healthytweets.herokuapp.com/
   ```
 you should see `Cannot GET /` message on your broswer, due to the fact that `/` is not defined as an endpoint of the service.
 
 ### Usage
 1. __Health Service__ - simply add `/health` to the address above.
 <div align="center">
 <img src="https://i.ibb.co/CP5VFgp/health.png"</img>
 </div>
 <div align="center">
  An example of a health-service endpoint usage
 </div>
 <br/>
   
 2. __Twitter Service__ - 
  * add `/tweets?query=YOUR_STRING` to the address above.  
  * `YOUR_STRING` should be a valid query for [Twiter API](https://developer.twitter.com/en/docs/twitter-api).  
  * In case of invalid query for the endpoint `/tweets`, an ERROR will be returned.
 <br/>

## Run The Service Locally With a Docker
If you would like to run the service locally on your device and getting the chance to add, edit or change the built-in service - follow the instructions below.  
### Prerequisites
* __NodeJS__ - Make sure you have [NodeJS](https://nodejs.org/en/) installed.
* __Twitter API Access__ - 
  * Make a [Twitter Developer Account](https://developer.twitter.com/en/apply-for-access) and create a 'dummy' application on the Developer Portal.
  * Click on your application on the dashboard and choose 'Keys and tokens'.
  * Generate and save _Consumer Keys_ and _Bearer Token_. These 3 keys are required to access the Twiter API.
* [Install](https://www.docker.com/get-started) __Docker__.

  
### Usage
1. Download the ___Code___ directory. Open your CMD and change to the folder.
2. __Environment Variables__ -
   * Change the name of `.env_sample` file to `.env`.
   * Paste the 3 keys you saved in the Prerequisites part in the right place in the new `.env` file, and save it.
3. __Docker__ -
   * Build the docker:
   ```sh
   $ docker build . -t <your-username>/<service/app-name>
   ```
      
   * Run the docker:
   ```sh
   $ docker run -dp <PORT>:3000 <your-username>/<service/app-name>
   ```
   `<PORT>` can be any port number you like. 
     
   * Use the serivce (In your broswer):  
     paste `http://localhost:<PORT>/health` for the _Health Service_.  
     paste `http://localhost:<PORT>/tweets?query=YOUR_STRING`, for the _Twitter Service_.  
       
   * Stop the docker:  
    Use `docker ps` command, and copy your docker's <_CONTAINER ID_>.  
    Run the following command:
    ```sh
    $ docker stop <CONTAINER ID>
    ```

   


