import Vue from 'vue'
import Vuex from 'vuex'
import districts from './modules/districts'
import activities from './modules/activities'
import blogPosts from './modules/blog-posts'
import events from './modules/events'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getters: {

    },
    modules: {
        districts,
        activities,
        blogPosts,
        events
    }
})