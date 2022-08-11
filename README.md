# Northcoders News API

## Link to hosted version:

https://appbencnews.herokuapp.com/api

## Summary

This is a backend application built with javascript, POSTGRES and express providing a REST api to client side nc news app.

Built with an MVC design pattern this api handles the controller and model aspects of the design.

## To clone the repo locally

    $ git clone https://github.com/Damog83/BE-NCNews.git

# Setup

## .env files

To run the file locally create two .env file within the main folder .env.test and .env.development.

Within .env.test copy and paste 

    PGDATABASE=nc_news_test
    
Within .env.development copy and paste

    PGDATABASE=nc_news
    
## Dependencies

To install dependencies within terminal

    $ npm install
    
## Seed Database
    
To seed the database within terminal

    $ npm run setup-dbs
    $ npm run seed
    
## Run Test Suite

To run the test suite within terminal

    $ npm test
    
To run the app.tests

    $ npm test app.test.js

    
