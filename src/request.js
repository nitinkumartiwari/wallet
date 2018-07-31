import http from 'http';
import request from 'request-promise';

export default async function requestRPC(method, params) {
  const hostname = '127.0.0.1';
  const port = 8888;
  let options = {
       forever: true,
       json: {'jsonrpc': '2.0', 'id': '0', 'method': method}
   };

   if (params) {
       options['json']['params'] = params;
   }

   const res = new Promise((resolve) => {
     request.post(`http://${hostname}:${port}/json_rpc`, options)
       .then((result) => {
           console.log("result", result);
           if (result.hasOwnProperty('result')) {
               resolve(result.result);
           } else {
               resolve(result);
           }
       });
    });
    const response = await res;
    return response;
}
