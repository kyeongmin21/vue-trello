<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div class="board-item"
           ref="boardItem"
           v-for="board in boards"
           :key="board.id"
           :data-bgcolor="board.bgColor"
      >
        <router-link :to="`/board/${board.id}`">
          <div class="board-item-title">{{ board.title }}</div>
        </router-link>
      </div>
      <div class="board-item">
        <a class="new-board-btn" href="" @click.prevent="addBoard">
          Create new board...
        </a>
      </div>
    </div>

    <AddBoard v-if="isAddBoard"
              @close="modalClose"
              @submit="onAddBoard">
    </AddBoard>
  </div>
</template>


<script>
import {board} from '../api'
import AddBoard from "./AddBoard";

export default {
  name: 'Home',
  components: {
    AddBoard,
  },
  data() {
    return {
      loading: false,
      boards: [],
      error: '',
      isAddBoard: false,
    }
  },
  created() {
    this.fetchData()
  },
  updated() {
    this.$refs.boardItem.forEach(element => {
      element.style.backgroundColor = element.dataset.bgcolor
    })
  },
  methods: {
    addBoard() {
      this.isAddBoard = true
    },
    modalClose() {
      this.isAddBoard = false
    },
    onAddBoard(title) {
      // api
      board.create(title)
      .then(() => this.fetchData())
    },
    fetchData() {
      this.loading = true
      board.fetch()
        .then(data => {
          this.boards = data.list
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
    },

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
  background-color: rgba(0, 0, 0, .3);
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
  color: #fff;
  background: #888;
  font-weight: 700;
}

.modal-default-button {
  float: right;
  text-decoration: none;
}
</style>
