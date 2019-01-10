import { createPerimeter } from 'vue-kindergarten'

export default createPerimeter({
  purpose: 'post',

  can: {
    read: () => true,

    upvote(post) {
      return (
        this.isAuthenticated() &&
        this.isAuthor(post) === false &&
        post.votes.includes(this.child.id) === false
      )
    }
  },

  isAuthenticated() {
    return this.child !== null
  },

  isAuthor(post) {
    return this.child.id === post.userId
  }
})
