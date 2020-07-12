import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const AcronymStore = new Vuex.Store({
    state: {
        acronyms: []
    },

    actions: {

    },

    mutations: {

        addAcronym(state, acronym) {
            if (!state.acronyms.includes(acronym)) {
                state.acronyms.push(acronym)
            }
        },

        removeAcronym (state, acronym) {
            state.acronyms = state.acronyms.filter((n) => n !== acronym)
        },

        clear (state) {
            state.acronyms = []
        }

    }
})

export default AcronymStore