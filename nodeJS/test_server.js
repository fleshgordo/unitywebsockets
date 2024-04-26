const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 8080
}, () => {
  console.log('server started')
})

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    console.log(isBinary ? data : data.toString());
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });


  ws.send('something');

  // setInterval(function () {
  //   const currentDate = new Date();
  //   ws.send(currentDate.getTime());
  // }, 2000)
});