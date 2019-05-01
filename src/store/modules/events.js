import events from '@/data/events'

const state = {
    events: events
}

const mutations = {

}

const actions = {

}

const getters = {
    events: state => {
        return state.events
      },
}

export default {
    state,
    mutations,
    actions,
    getters
}