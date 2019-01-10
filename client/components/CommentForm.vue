<template>
  <article class="media">
    <div class="media-content">
      <div class="field">
        <p class="control">
          <textarea
            v-model="body"
            class="textarea"
            placeholder="Add a comment..."
          />
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button
            :disabled="!body"
            class="button"
            @click="commentPosted"
          >Post comment</button>
        </p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data: () => ({
    body: null
  }),
  methods: {
    commentPosted() {
      this.$emit('posted', { body: this.body })
      this.body = null
    }
  }
}
</script>
