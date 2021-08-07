## SimpleFork
A quick and dirty method to handle child_process.fork() objects.

### Install
Nomral NPM Installation.
> npm install @leemcdonald-au/simplefork

### Usage
```javascript
import SimpleFork from '@leemcdonald-au/simplefork'

const fork = new SimpleFork(`/path/to/my/script.js`, ['-key', '/etc/letsencrypt/key.pem', '-cert', '/etc/letsencrypt/cert.pem'])

// Trigger an abort error.
fork.abort()

// Kill process quietly.
fork.kill()

// Send data to process.
fork.send({ my: "beautiful", obj: "rules" })

// Send a socket.
require('net').createServer(socket => fork.send(null, socket)).listen(6110)

// Stock fork() emitters are passed.
fork.on('message', (message, socket) => console.log(message, socket ? 'yeah' : 'nah'))
fork.on('error', error => console.error(error))

```

### Support
- RVN: RPzCvWdmgqPTBA5qMQFuRPfNoJmvPnVzw8
- ARK: Aeh9tR1zjE34hBrYfSD1EMfL1cxpkaVJKb
- ETH: 0xd9979f482da58b4432d0f52eb456f7dd1f4897e6
- BTC: 1HzR3Vyu231E8SsGLUbNYSb92bn6MGLEaV