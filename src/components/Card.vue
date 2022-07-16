<template>
  <div>
    <Modal>
      <h1>Card</h1>
      <div v-if="loading">loading card...</div>
      <div v-else>
        <div>card Id : {{ cardId }}</div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'Card',
  components: {
    Modal
  },
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
