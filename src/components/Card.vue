<template>
  <div>
    <h1>Card</h1>
    <div>card Id : {{ cardId }}</div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data() {
    return {
      cardId: 0
    }
  },
  watch: {
    '$route'() {
      this.cardId = this.$route.params.cardId
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
