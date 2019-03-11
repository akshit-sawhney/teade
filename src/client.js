"use strict"

var request = require('request');

function Client(host, port) {
	if (!host || !isNaN(host)) {
		throw new Error('No Host Defined in Client Initialisation');
	}
	if (!port || isNaN(port)) {
		throw new Error('No Port Defined in Client Initialisation');
	}
	this.host = host;
	this.port = port;
}

Client.prototype.request = function(method, payload, callback) {
	let host = this.host;
	let port = this.port;
	request({
	    url: host+':'+port+'/'+method,
	    method: "POST",
	    json: payload,
      	    timeout: 10000
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(null, body);
		} else if (error) {
			callback(error);
		} else if (body) {
			callback(new Error(body));
		} else {
			callback(new Error('Unknown error, the statusCode recieved was not 200'));
		}
	});
}

exports.Client = Client;
