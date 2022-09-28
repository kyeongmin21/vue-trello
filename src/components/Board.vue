<template>
  <div>
    <h3>Board</h3>
    <div v-if="loading">loading bard...</div>
    <div v-else>
      bid ({{ bid }})
      <router-link :to="`/board/${bid}/card/1`">Card 1</router-link>
      |
      <router-link :to="`/board/${bid}/card/2`">Card 2</router-link>
    </div>
    <hr>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Board.vue",
  data() {
    return {
      bid: 0,
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
        this.bid = this.$route.params.bid
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>
