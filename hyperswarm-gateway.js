const HyperswarmServer = require('hyperswarm-proxy-ws/server')

// Initialize the proxy server
const server = new HyperswarmServer()
server.setMaxListeners(0)
// Start listening on clients via websocket protocol
server.listen(3472)
