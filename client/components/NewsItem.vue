<template>
  <article class="media">
    <figure class="media-left">
      <button
        class="button is-white"
        @click="$emit('upvote')"
      >
        <span class="icon is-small">
          <i
            class="fas fa-thumbs-up"
            title="Vote up" />
        </span>
      </button>
    </figure>
    <div class="media-content">
      <div>
        <p>
          <a :href="item.url"><strong>{{ item.title }}</strong></a> <small>({{ item.url | domain }})</small>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <span class="level-item">
            <small>{{ votes }} · posted by {{ item.author }} · {{ item.timestamp | timeAgo }}</small>
          </span>
          <nuxt-link
            :to="`/news/${item.id}`"
            class="level-item"
          >
            <span class="icon is-small"><i class="fas fa-comments" /></span>
          </nuxt-link>
        </div>
      </nav>

      <article
        v-for="comment in comments"
        :key="comment.id"
        class="media"
      >
        <figure class="media-left">
          <p class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              {{ comment.body }}
              <br>
              <small>{{ comment.author }} · {{ comment.timestamp | timeAgo }}</small>
            </p>
          </div>
        </div>
      </article>
    </div>
  </article>
</template>

<script>
import parseDomain from 'parse-domain'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'

export default {
  filters: {
    domain(value) {
      if (!value) return ''
      const parts = parseDomain(value)
      return parts ? `${parts['domain']}.${parts['tld']}` : ''
    },
    timeAgo(value) {
      if (!value) return ''
      return distanceInWordsStrict(new Date(), new Date(value), {
        addSuffix: true
      })
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    comments() {
      return this.item.comments || []
    },
    votes() {
      const votes = this.item.votes.length
      const suffix = votes === 1 ? 'vote' : 'votes'
      return `${votes} ${suffix}`
    }
  }
}
</script>
