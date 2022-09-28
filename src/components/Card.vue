<template>
  <div>
    <h3>Card</h3>
    <div v-if="loading">loading card...</div>
    <div v-else>cid : {{ cid }}</div>
  </div>
</template>

<script>
export default {
  name: "Card.vue",
  data() {
    return {
      cid: 0,
      loading: false
    }
  },
  watch: {
    $route() {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {
        this.cid = this.$route.params.cid
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>
