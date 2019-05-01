import activities from '@/data/activities'

const state = {
    activities: activities
}

const mutations = {

}

const actions = {

}

const getters = {
    activities: state => {
        return state.activities
      },
}

export default {
    state,
    mutations,
    actions,
    getters
}