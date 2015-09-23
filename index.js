'use strict';

var Hapi = require('hapi');

// This is a very simple example heroku app which demonstrates making
// used of the hapi-heroku-helpers plugin (https://github.com/briandela/hapi-heroku-helpers)

var server = new Hapi.Server();

// When running on heroku the port will be provided
// by process.env.PORT
server.connection({ port: process.env.PORT || 3000 });


server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {

        return reply.view('index', { request: request });
    }
})


var plugins = [
    require('vision'),
    require('hapi-heroku-helpers')
];


server.register(plugins, function(err) {

    if (err) {
        console.error('Failed to load plugins:', err);
    }

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'views'
    });

    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
});
