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
      boards: [],
      error: ''
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
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0,0,0, .1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>
