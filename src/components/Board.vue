<template>
  <div>
    <h1>Board</h1>
    <p>board Id : {{ boardId }}</p>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Board',
  components: {},
  data() {
    return {
      boardId: 0
    }
  },
  created() {
    this.boardId = this.$route.params.id
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style>

</style>
