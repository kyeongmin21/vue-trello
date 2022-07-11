<template>
  <div>
    <h1>Board</h1>
    <div v-if="loading">loading board...</div>
    <div v-else>
      <p>board Id : {{ boardId }}</p>
      <pre>{{ this.board }}</pre>
      <router-link :to="`/board/${boardId}/card/1`">card 1</router-link> |
      <router-link :to="`/board/${boardId}/card/2`">card 2</router-link>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Board',
  data() {
    return {
      boardId: 0,
      loading: false
    }
  },
  computed: {
    ...mapState(['board'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions(['FETCH_BOARD']),
    fetchData() {
      this.loading = true
      this.FETCH_BOARD({id: this.$route.params.id})
      .then(() => this.loading = false)
    }
  }
}
</script>

<style>

</style>
