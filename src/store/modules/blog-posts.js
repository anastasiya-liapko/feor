import blogPosts from '@/data/blog-posts'

const state = {
    blogPosts: blogPosts
}

const mutations = {

}

const actions = {

}

const getters = {
    blogPosts: state => {
        return state.blogPosts
      },
}

export default {
    state,
    mutations,
    actions,
    getters
}