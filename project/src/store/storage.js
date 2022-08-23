import { createStore } from "vuex";

// state, getters, mutations, actions, modules
export default createStore({
    state : {
        counter : 0
    },
    mutations : {
        increment(state){
            state.counter = value;
        }
    },
});