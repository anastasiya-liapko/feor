import districts from '@/data/districts'

const state = {
    districts: districts
}

const mutations = {

}

const actions = {

}

const getters = {
    districts: state => {
        return state.districts
      },
}

export default {
    state,
    mutations,
    actions,
    getters
}