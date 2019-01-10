import Vue from 'vue'
import VueKindergarten from 'vue-kindergarten'

Vue.use(VueKindergarten, {
  child: store => store && store.state.auth.user
})
