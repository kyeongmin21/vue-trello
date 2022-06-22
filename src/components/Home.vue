<template>
  <div>
    <h1>Home</h1>
    <div>
      Board List :
      <div v-if="loading">Loading...</div>
      <div v-else>Api result: {{ apiRes }}</div>
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
    return {
      loading: false,
      apiRes: ''
    }
  },
  created() {
    this.fetchData()
  },
  computed: {},
  watch: {},
  methods: {
    fetchData() {
      this.loading = true
      const req = new XMLHttpRequest()
      req.open('GET', 'http://localhost:3000/health')

      // client > server 요청이 날라감
      req.send()

      req.addEventListener('load', () => {
        this.loading = false
        this.apiRes = {
          status:  req.status,
          statusText: req.statusText,
          response: JSON.parse(req.response)
        }
      })
    }
  }
}
</script>

<style>

</style>
