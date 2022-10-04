<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div class="board-item"
           ref="boardItem"
           v-for="board in boards"
           :key="board.id"
           :data-bgcolor="board.bgColor">
        <router-link :to="`/board/${board.id}`">
          <div class="board-item-title">{{ board.title }}</div>
        </router-link>
      </div>

      <div class="board-item">
        <a class="new-board-btn"
           @click.prevent="addBoard">
          Create new board...
        </a>
      </div>
    </div>

    <AddBoard v-if="isAddBoard"/>

  </div>
</template>

<script>
import AddBoard from "./AddBoard";
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: "Home",
  components: {
    AddBoard
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState(['isAddBoard', 'boards']),
    isAddBoard() {
      return this.$store.state.isAddBoard
    }
  },
  created() {
    this.fetchData()
  },
  updated() {
    this.$refs.boardItem.forEach(el => {
      el.style.backgroundColor = el.dataset.bgcolor
    })
  },
  methods: {
    ...mapMutations(['SET_IS_ADD_BOARD']),
    ...mapActions(['FETCH_BOARDS']),
    fetchData() {
      this.loading = true
      this.FETCH_BOARDS()
        .finally(() => {
          this.loading = false
        })
    },
    addBoard() {
      // this.isAddBoard = true
      // this.$store.commit('SET_IS_ADD_BOARD', true)
      this.SET_IS_ADD_BOARD(true)
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
