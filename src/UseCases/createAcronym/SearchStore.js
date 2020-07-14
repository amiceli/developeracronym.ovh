import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const SearchStore = new Vuex.Store({
    state: {
        loading: false,
        topics: [],
        rateLimit: false,
        definitions : 0,
    },
    actions: {
        async loadAcronymDefinition(ctx, acronym) {
            return new Promise(async (resolve) => {
                const options = { params: { acronym } }
                const { data } = await axios.get('/.netlify/functions/scrap-acronyms', options)

                ctx.commit('countDefinition', data)

                resolve(data)
            })
        },
        async searchTopicsOnGithub(ctx, search) {
            const options = {
                params: { q: search },
                headers: {
                    'Accept': 'application/vnd.github.mercy-preview+json'
                }
            }

            ctx.commit('updateTopics', [])
            ctx.commit('toogleLoading')
            ctx.commit('rateLimit', false)

            try {
                const { data } = await axios.get('https://api.github.com/search/topics', options)

                ctx.commit('updateTopics', data.items.map((i) => i.name))
                ctx.commit('toogleLoading')
            } catch (e) {
                if (e.response.status === 403) {
                    ctx.commit('rateLimit', true)
                }
            }
        }
    },
    mutations: {
        updateTopics(state, topics) {
            state.topics = topics
        },
        toogleLoading(state) {
            state.loading = !state.loading
        },
        clear(state) {
            state.topics = []
        },
        rateLimit(state, value) {
            state.rateLimit = value
        },
        countDefinition (state, definitions) {
            state.definitions += definitions.length
        }
    }
})

export default SearchStore