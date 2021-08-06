// Import Objects
import { EventEmitter } from 'events'

// Import Functions.
import { fork } from 'child_process'

// Symbols.
const s = { script: Symbol('script'), args: Symbol('args'), options: Symbol('options'), process: Symbol('process'), control: Symbol('control') }

// SimpleFork object to handle child_process objects. Pass messages between, allow simple shutdown and restart.
export default class SimpleFork extends EventEmitter {
    constructor(script = '', args = [], options = {}) {
        // All is well.
        super() // =D

        // Bind provided values to object, define process for fork() to sit.
        this[s.script]  = script
        this[s.args]    = args
        this[s.options] = options
        this[s.process] = null
        this[s.control] = null

        // Start the script on launch.
        this.start()
    }

    // Start the process.
    start() {
        // Create an AbortController for abort().
        this[s.control] = new AbortController

        // Add the controller to the options.
        this[s.options].signal = this[s.control].signal

        // Fork the script.
        this[s.process] = fork(this[s.script], this[s.args], this[s.options])

        // Pass events onto the top emitter.
        const events = ['close', 'disconnect', 'error', 'message', 'exit', 'spawn']
        events.forEach(event => this.process.on(event, (...args) => this.emit(event, ...args)))
    }

    // Abort the process with included AbortController().
    abort() { this[s.control].abort() }

    // Kill the process with wanted UNIX code.
    kill(code = 2) { this.process.kill(code) }

    // Send messages to the process.
    send(message, socket = null) { this.process.send(message, socket) }

    // Getters.
    get script()    { return this[s.script] }
    get args()      { return this[s.args] }
    get options()   { return this[s.options] }
    get process()   { return this[s.process] }
}