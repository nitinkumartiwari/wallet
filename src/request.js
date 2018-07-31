import http from 'http';

export default function request(method, params) {
  const options = {
    hostname: '127.0.0.1',
    port: 8888,
    path: '/json_rpc',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    method,
    params,
  };
  const req = http.request(options, function(res) {
    console.log('Status: ' + res.statusCode);
    console.log('Headers: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (body) {
      console.log('Body: ' + body);
    });
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  // write data to request body
  req.write('{"string": "Hello, World"}');
  req.end();
}
