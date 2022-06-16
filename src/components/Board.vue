<template>
  <div>
    <h1>Board</h1>
    <p>board Id : {{ boardId }}</p>
    <router-link :to="`/board/${boardId}/card/1`">card 1</router-link> |
    <router-link :to="`/board/${boardId}/card/2`">card 2</router-link>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data() {
    return {
      boardId: 0
    }
  },
  created() {
    this.boardId = this.$route.params.id
  }
}
</script>

<style>

</style>
