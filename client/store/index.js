import Vuex from 'vuex'
import uuid from 'uuid/v4'

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
      selectedPost: null
    },
    getters: {
      topPosts: state =>
        state.posts.sort((a, b) => b.votes.length - a.votes.length),
      newPosts: state => state.posts.sort((a, b) => b.timestamp - a.timestamp)
    },
    actions: {
      async upvotePost({ commit }, { postId }) {
        const postUrl = `/api/posts/${postId}`
        try {
          const { data } = await this.$axios.get(postUrl)
          data.votes.push(this.$auth.user.id)
          const res = await this.$axios.put(postUrl, data)
          commit('updatePost', { post: res.data })
        } catch (error) {
          console.error(error)
        }
      },
      async getPosts({ commit }) {
        try {
          const res = await this.$axios.get('/api/posts')
          commit('setPosts', { posts: res.data })
        } catch (error) {
          console.error(error)
        }
      },
      async getComments({ commit }, { postId }) {
        try {
          const res = await this.$axios.get(
            `/api/posts/${postId}?_embed=comments`
          )
          commit('setSelectedPost', { post: res.data })
        } catch (error) {
          console.error(error)
        }
      },
      async saveComment({ commit, state }, { body }) {
        const user = this.$auth.user
        const data = {
          id: uuid(),
          postId: state.selectedPost.id,
          userId: user.id,
          author: user.username,
          body,
          timestamp: new Date().getTime()
        }

        try {
          const res = await this.$axios.post('/api/comments', data)
          commit('addComment', { comment: res.data })
        } catch (error) {
          console.error(error)
        }
      },
      async savePost(context, { title, url }) {
        const user = this.$auth.user
        const data = {
          id: uuid(),
          userId: user.id,
          author: user.username,
          title,
          url,
          votes: [],
          timestamp: new Date().getTime()
        }

        try {
          await this.$axios.post('/api/posts', data)
        } catch (error) {
          console.error(error)
        }
      },
      async saveUser(context, { username, email, password }) {
        const data = {
          id: uuid(),
          username,
          email,
          password,
          timestamp: new Date().getTime()
        }

        try {
          await this.$axios.post('/api/register', data)
        } catch (error) {
          console.error(error)
        }
      }
    },
    mutations: {
      addComment(state, { comment }) {
        state.selectedPost.comments.push(comment)
      },
      setPosts(state, { posts }) {
        state.posts = posts
      },
      setSelectedPost(state, { post }) {
        state.selectedPost = post
      },
      updatePost(state, { post }) {
        const index = state.posts.findIndex(p => p.id === post.id)
        if (index >= 0) {
          state.posts.splice(index, 1, post)
        }
        if (state.selectedPost && state.selectedPost.id === post.id) {
          state.selectedPost.votes = post.votes
        }
      }
    }
  })
}

export default createStore
