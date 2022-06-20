<template>
  <div>
    <h1>Card</h1>
    <div v-if="loading">loading card...</div>
    <div v-else>
      <div>card Id : {{ cardId }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      cardId: 0,
      loading: false
    }
  },
  watch: {
    '$route'() {
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
        this.cardId = this.$route.params.cardId
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style>

</style>
