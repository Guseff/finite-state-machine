class FSM {

    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error("No config!");
        this.initial = config.initial;
        this.states = config.states;
        this.state = config.initial;
        this.history = [];
        this.stack = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.states[state]) throw new Error("No such state!");
        this.history.push(this.state);
        this.state = state;
        this.stack = [];
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!this.states[this.state].transitions[event]) throw new Error("No such event!");
        this.history.push(this.state);
        this.state = this.states[this.state].transitions[event];
        this.stack = [];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.history.push(this.state);
        this.state = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let res = [];
        for (let key in this.states) {
            if (!event || this.states[key].transitions[event]) res.push(key);
        }
        return res;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length === 0) return false;
        this.stack.push(this.state);
        this.state = this.history[this.history.length - 1];
        this.history.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.stack.length === 0) return false;
        this.history.push(this.state);
        this.state = this.stack[this.stack.length - 1];
        this.stack.pop();
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.stack = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
