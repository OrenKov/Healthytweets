[![npm version](https://badge.fury.io/js/node-request-context.svg)](http://badge.fury.io/js/node-request-context/)

# Healthytweets
## Overview
An implemented [Autodesk Intern Home Assignment](https://gist.github.com/guyguyon/f33f8cbd0fa2216d133070e9437f628a). The task includes writing a simple service and deploying it to Heroku with a Docker container.
  
## Serivce Details
The service has 2 endpoints:
1. __Health Service__ (GET /health):
   * Return a health check for the service - OS Name, NodeJS Version, Memory Usage (%), CPU Usage (%).  
2. __Twitter Service__ (GET /tweets?query=YOUR_STRING):
   * Get a string (_YOUR_STRING_) and return the 10 latest tweets from Twiter API.  
   
  
## Healthytweets in Heroku


## Run The Service Locally With a Docker
If you would like to run the application locally on your device and getting the chance to add, edit or change the built-in service - follow the instructions below.  
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
   $ docker run -dp 3000:3000 <your-username>/<service/app-name>
   ```
     
   * Use the serivce (In your broswer):  
     paste `http://localhost:3000/health` for the _Health Service_.  
     paste `http://localhost:3000/tweets?query=YOUR_STRING`, for the _Twitter Service_.  
       
   * Stop the docker:  
    Use `docker ps` command, and copy your docker's <_CONTAINER ID_>.  
    Run the following command:
    ```sh
    $ docker stop <CONTAINER ID>
    ```

   


