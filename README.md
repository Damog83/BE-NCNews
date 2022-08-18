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

To run the file locally create two .env files within the main folder .env.test and .env.development.

Within .env.test copy and paste 

    PGDATABASE=nc_news_test
    
Within .env.development copy and paste

    PGDATABASE=nc_news
    
## Install Dependencies

    $ npm install
    
## Seed Database

    $ npm run setup-dbs
    $ npm run seed
    
## Run Test Suite

    $ npm test
    
## Run the app.tests

    $ npm test app.test.js

# Rest API

## Get Endpoints

### Request

GET /api

### Example response

{'endpoints': { 'GET /api': { description:
				'serves up a json representation of all the available endpoints of the api',
		      }, 
               'GET /api/topics': { description: 'serves an array of all topics',
			                        queries: [ ],
			                        exampleResponse: { topics: [{ slug: 'football', description: 'Footie!' }],
			                       }
             }
}

## Get Topics

### Request

GET /api/topics

### Example response

{ topics: [{ slug: 'football', description: 'Footie!' }]}

## Get Users

### Request

GET /api/users

### Example response

{ users: [{ name: 'Tom Tickle', name: 'Paul Grump' }] }

## Get Articles

### Request

GET /api/articles

Queries : ['topic', 'sort', 'order']

### Example response

{
					articles: [
						{
							article_id: 1,
							title: 'Seafood substitutions are increasing',
							topic: 'cooking',
							author: 'weegembump',
							body: 'Text from the article..',
							created_at: '2022-04-04T20:45:00.691Z',
							votes: 100,
							comment_count: 11,
						},
						{
							article_id: 2,
							title: 'Running a Node App',
							topic: 'coding',
							author: 'jessjelly',
							body: 'Text from the article..',
							created_at: '2022-03-04T20:45:00.691Z',
							votes: 0,
							comment_count: 3,
						},
					],
				}













