'use strict';

var Hapi = require('hapi');
var Inert = require('inert');

// Create a server with a port
var server = new Hapi.Server();
server.connection({
  port: 3000
});

// Add the route to serve index.html
server.register(Inert, function(err){
  if(err) throw err;
  server.route({
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
      return reply.file('index.html');
    }
  });
  server.route({
    method: 'GET',
    path:'/{path*}',
    handler: {
      directory: {
        path: './',
        index: false
      }
    }
  });
});


// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
