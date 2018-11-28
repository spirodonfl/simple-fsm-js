class FSM {
    constructor () {
        this.states = {};
        this.currentState = 'default';
    }
    moveToState(state) {
        if (!this.states[state] || this.currentState === state) {
            return false;
        } else {
            if (this.states[state]._before) {
                this.states[state]._before();
            }
            this.currentState = state;
            if (this.states[state]._after) {
                this.states[state]._after();
            }
            return true;
        }
    }
    runAction(action, ...args) {
        if (!this.states[this.currentState][action]) {
            return false;
        } else {
            this.states[this.currentState][action](...args);
            return true;
        }
    }
    _populateTestStates () {
        this.states = {
            'test': {
                '_before': () => {console.log('before');},
                '_after': () => {console.log('after');},
                'special action': (a, c) => {console.log('SPECIAL', [a, c]);}
            }
        };
        /*
        let abc = new FSM();
        abc._populateTestStates();
        abc.moveToState('test');
        abc.runAction('special action');
        abc.runAction('special action', 23, 34);
        */
    }
}
