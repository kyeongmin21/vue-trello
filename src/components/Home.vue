<template>
  <div>
    <h1>Home</h1>
    <div>
      Board List :
      <ul>
        <li>
          <router-link to="/board/1">board 1</router-link>
        </li>
        <li>
          <router-link to="/board/2">board 2</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {}
}
</script>

<style>

</style>
