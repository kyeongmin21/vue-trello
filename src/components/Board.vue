<template>
  <div>
    <h1>Board</h1>
    <div v-if="loading">loading board...</div>
    <div v-else>
      <p>board Id : {{ boardId }}</p>
      <router-link :to="`/board/${boardId}/card/1`">card 1</router-link> |
      <router-link :to="`/board/${boardId}/card/2`">card 2</router-link>
    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data() {
    return {
      boardId: 0,
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {
        this.boardId = this.$route.params.id
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style>

</style>
