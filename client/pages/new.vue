<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Top Links</h1>
      <div>
        <news-item
          v-for="post in newPosts"
          :key="post.id"
          :item="post"
          @upvote="upvotePost(post)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import postsPerimeter from '~/perimeters/postsPerimeter'
import NewsItem from '~/components/NewsItem'

export default {
  components: { NewsItem },
  fetch({ store }) {
    store.dispatch('getPosts')
  },
  computed: mapGetters(['newPosts']),
  methods: {
    ...mapActions(['upvotePost']),
    onUpvote(post) {
      if (this.$isAllowed('upvote', post)) {
        this.upvotePost({ postId: post.id })
      }
    }
  },
  perimeters: [postsPerimeter]
}
</script>
