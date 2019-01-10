<template>
  <section class="section">
    <div class="container">
      <news-item
        :item="selectedPost"
        @upvote="onUpvote(selectedPost)"
      />
      <comment-form
        v-if="$auth.loggedIn"
        @posted="saveComment"  
      />
      <p v-else>
        Please <nuxt-link to="/register">register</nuxt-link> or 
        <nuxt-link to="/login">login</nuxt-link> to comment.
      </p>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import postsPerimeter from '~/perimeters/postsPerimeter'
import NewsItem from '~/components/NewsItem'
import CommentForm from '~/components/CommentForm'

export default {
  fetch({ store, params }) {
    const postId = params.id
    return store.dispatch('getComments', { postId })
  },
  components: { CommentForm, NewsItem },
  computed: mapState(['selectedPost']),
  methods: {
    ...mapActions(['saveComment', 'upvotePost']),
    onUpvote(post) {
      if (this.$isAllowed('upvote', post)) {
        this.upvotePost({ postId: post.id, updateSelectedPost: true })
      }
    }
  },
  perimeters: [postsPerimeter]
}
</script>

<style scoped>
p {
  text-align: center;
  margin: 2em;
}
</style>
