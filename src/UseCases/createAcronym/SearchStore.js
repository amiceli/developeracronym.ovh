import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const SearchStore = new Vuex.Store({
    state: {
        loading: false,
        topics: [],
        rateLimit : false
    },
    actions: {
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
        rateLimit (state, value) {
            state.rateLimit = value
        }
    }
})

export default SearchStore