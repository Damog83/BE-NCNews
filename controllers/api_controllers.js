exports.getApi = (req, res, next) => {
	res.status(200).send({
		endpoints: {
			'GET /api': {
				description:
					'serves up a json representation of all the available endpoints of the api',
			},
			'GET /api/topics': {
				description: 'serves an array of all topics',
				queries: [],
				exampleResponse: {
					topics: [{ slug: 'football', description: 'Footie!' }],
				},
			},
			'GET /api/users': {
				description: 'serves an array of users',
				queries: [],
				exampleResponse: {
					users: [{ name: 'Tom Tickle', name: 'Paul Grump' }],
				},
			},
			'GET /api/articles': {
				description: 'serves an array of all topics',
				queries: ['topic', 'sort', 'order'],
				exampleResponse: {
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
				},
			},
			'GET /api/articles/:article_id': {
				description: 'serves an object containing article',
				queries: [],
				exampleResponse: {
					article: {
						article_id: 1,
						title: 'Seafood substitutions are increasing',
						topic: 'cooking',
						author: 'weegembump',
						body: 'Text from the article..',
						created_at: '2022-04-10T20:45:00.691Z',
						votes: 100,
						comment_count: 11,
					},
				},
			},
			'PATCH /api/article/:article_id': {
				description: 'serves an object containing updated article',
				queries: [],
				exampleResponse: {
					article: {
						article_id: 1,
						title: 'Seafood substitutions are increasing',
						topic: 'cooking',
						author: 'weegembump',
						body: 'Text from the article..',
						created_at: '2022-04-10T20:45:00.691Z',
						votes: 101,
						comment_count: 11,
					},
				},
			},
			'GET /api/articles/:article_id/comments': {
				description: 'serves an array of all comments on article',
				queries: [],
				exampleResponse: {
					comments: [
						{
							comment_id: 1,
							body: 'Text from the comment.',
							votes: -1,
							author: 'tickle122',
							article_id: 18,
							created_at: '2022-04-10T20:45:00.691Z',
						},
						{
							comment_id: 19,
							body: 'Text from the comment.',
							votes: 7,
							author: 'grumpy19',
							article_id: 4,
							created_at: '2022-04-10T20:45:00.691Z',
						},
					],
				},
			},
			'POST /api/articles/:article_id/comments': {
				description: 'serves an object containing posted comment',
				queries: [],
				exampleResponse: {
					comment: {
						comment_id: 19,
						body: 'Text from the comment',
						article_id: 1,
						author: 'grumpy19',
						votes: 0,
						created_at: '2022-06-22T20:45:00.691Z',
					},
				},
			},
			'DELETE /api/comments/:comment_id': {
				description: 'removes comment from database with nothing returned',
				queries: [],
			},
		},
	});
};
