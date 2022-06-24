<template>
  <div>
    <h1>Home</h1>
    <div>
      Board List :
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="item in boards" :key="item.id">{{ item }}</div>
        Api result: {{ boards }}
      </div>
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
import { board } from '../api'

export default {
  name: 'Home',
  data() {
    return {
      loading: false,
      boards: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      board.fetch()
        .then(data => {
          this.boards = data
        })
        .finally(() => {
          this.loading = false
        })

      /*
        axios.get('http://localhost:3000/boards')
          .then(res => {
            this.boards = res.data
          })
          .catch(() => {
            this.$router.replace('/login')
          })
          .finally(() => {
            this.loading = false
          })
      */

      /*
        const req = new XMLHttpRequest()
        req.open('GET', 'http://localhost:3000/health')
        req.send() // client > server 요청이 날라감
        req.addEventListener('load', () => {
          this.loading = false
          this.apiRes = {
            status: req.status,
            statusText: req.statusText,
            response: JSON.parse(req.response)
          }
        })
      */
    }
  }
}
</script>

<style>

</style>
