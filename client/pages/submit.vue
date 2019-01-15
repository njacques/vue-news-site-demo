<template>
  <section class="section">
    <div class="container">
      
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            v-model="title"
            class="input"
            type="text"
            placeholder="Text input"
          >
        </div>
      </div>

      <div class="field">
        <label class="label">Full URL (inc. http(s)://)</label>
        <div class="control">
          <input
            v-model="url"
            class="input"
            type="text"
            placeholder="Text input"
          >
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button
            :disabled="isSaving"
            class="button is-link"
            @click="submitPost"
          >Submit</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'auth',
  data: () => ({
    isSaving: false,
    title: null,
    url: null
  }),
  methods: {
    ...mapActions(['savePost']),
    async submitPost() {
      this.isSaving = true

      await this.savePost({
        title: this.title,
        url: this.url
      })

      this.title = null
      this.url = null
      this.isSaving = false
    }
  }
}
</script>
