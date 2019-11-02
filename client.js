const HyperswarmProxyClient = require('hyperswarm-proxy/client')
const websocket = require('websocket-stream')

const DEFAULT_PROXY = 'TODO: set one up'
const LOCAL_PROXY = 'TODO: decide on local port and stuff'
const DEFAULT_RECONNECT_DELAY = 1000

class HyperswarmProxyWSClient extends HyperswarmProxyClient {
  constructor (opts = {}) {
    super(opts)

    const { proxy = DEFAULT_PROXY, reconnectDelay = DEFAULT_RECONNECT_DELAY } = opts

    this.proxy = proxy
    this.reconnectDelay = reconnectDelay

    this.reconnect()
  }

  reconnect () {
    const localSocket = websocket(LOCAL_PROXY)
    localSocket.once('error', () => {
      // Couldn't connect to a local proxy
      // Attempt to connect to the internet proxy
      const proxySocket = websocket(this.proxy)

      proxySocket.once('close', () => {
        setTimeout(this.reconnectDelay, () => {
          if (this.destroyed) return
          this.reconnect()
        })
      })

      super.reconnect(proxySocket)
    })
    super.reconnect(localSocket)
  }
}

module.exports = HyperswarmProxyWSClient
