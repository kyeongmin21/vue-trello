<template>
  <div>
    <h1>Card</h1>
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
  created() {
    this.cardId = this.$route.params.cardId
    console.log('id', this.cardId)
  },
  watch: {},
  methods: {}
}
</script>

<style>

</style>
