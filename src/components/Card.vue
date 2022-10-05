<template>
  <div>
    <h2>card</h2>
    <div v-if="loading">loading card..</div>
    <div v-else>
      cid: {{cid}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      cid: 0,
      loading: false
    }
  },
  watch: {
    $route() {
      // cid가 변경될 때마다 호출
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

<style>

</style>
