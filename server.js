const HyperswarmProxyServer = require('hyperswarm-proxy/server')
const websocket = require('websocket-stream')
const http = require('http')

class HyperswarmProxyWSServer extends HyperswarmProxyServer {
  constructor (opts = {}) {
    super(opts)
    const { server } = opts
    if (server) this.listenOnServer()
  }

  listenOnServer (server) {
    this.server = server
    this.websocketServer = websocket.createServer({ server }, (socket) => {
      this.handleStream(socket)
    })
  }

  listen (...args) {
    const server = http.createServer()
    this.listenOnServer()
    server.listen(...args)
  }

  destroy (cb) {
    this.wss.close(() => {
      super.close(cb)
    })
  }
}

module.exports = HyperswarmProxyWSServer
