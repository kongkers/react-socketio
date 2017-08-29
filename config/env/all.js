'use strict';

module.exports = {
	app: {
		title: 'Seven West Media Demo App',
		description: 'Full-Stack JavaScript with MongoDB, Express, ReactJS, and Node.js',
		keywords: 'MongoDB, Express, ReactJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'Holy Monley batman this is bad.',
	sessionCollection: 'Sessions',
	assets: {
		lib: {
			css: [
			],
            html: [
            ],
			js: [
			]
		},
		css: [

		],
		js: [
			
		]
	}
};
