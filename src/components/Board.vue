<template>
  <div>
    <div class="board-wrapper">
      <div class="board">

        <div class="board-header">
          <input v-if="isEditTitle"
                 type="text"
                 class="form-control"
                 v-model="inputTitle"
                 ref="inputTitle"
                 @blur="onSubmitTitle"
                 @keyup.enter="onSubmitTitle"/>
          <span v-else class="board-title"
                @click="onClickTitle">
               {{ board.title }}
          </span>
          <a href="" class="board-header-btn"
             @click.prevent="onShowSettings">
            Show Menu
          </a>
        </div>

        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper"
                 v-for="list in board.lists"
                 :key="list.pos"
                 :data-list-id="list.id">
              <List :data="list"/>
            </div>
            <div class="list-wrapper">
              <AddList />
            </div>
          </div>
        </div>

      </div>
    </div>

    <BoardSetting v-if="isShowMenu === true"/>
    <router-view/>

  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from "vuex"
import dragula from 'dragula'
import 'dragula/dist/dragula.css'
import List from '@/components/List'
import AddList from '@/components/AddList'
import BoardSetting from "@/components/BoardSetting";


export default {
  name: "Board",
  components: {
    List,
    AddList,
    BoardSetting
  },
  data() {
    return {
      bid: 0,
      loading: false,
      cDragger: null,
      lDragger: null,
      isEditTitle: false,
      inputTitle: ''
    }
  },
  computed: {
    ...mapState(['board', 'isShowMenu']),
  },
  created() {
    this.fetchData().then(() => {
      this.inputTitle = this.board.title
      this.SET_THEME(this.board.bgColor)
    })
    // board 페이지에 들어올 때, 초기셋팅 menu close
    this.SET_IS_SHOW_BOARD_MENU(false)
  },
  updated() {
    this.setListDragabble()

    // cDragger 초기화 작업
    if (this.cDragger) this.cDragger.destroy()

    // 유사배열을 NodeList->Array 하고 마우스를 놓았을 때 콘솔 출력
    this.cDragger = dragula([
      ...Array.from(this.$el.querySelectorAll('.card-list'))
    ]).on('drop', (el, wrapper) => {
      const targetCard = { id: el.dataset.cardId * 1, pos: 65545 }
      let prevCard = null
      let nextCard = null

      Array.from(wrapper.querySelectorAll('.card-item'))
        .forEach((el, idx, arr) => {
          const cardId = el.dataset.cardId * 1
          if (cardId === targetCard.id) {
            prevCard = idx > 0 ? {
              id: arr[idx - 1].dataset.cardId * 1,
              pos: arr[idx - 1].dataset.cardPos * 1
            } : null
            nextCard = idx < arr.length - 1 ? {
              id: arr[idx + 1].dataset.cardId * 1,
              pos: arr[idx + 1].dataset.cardPos * 1
            } : null
          }
        })

      if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2
      else if (!nextCard && prevCard) targetCard.pos = prevCard.pos * 2
      else if (prevCard && nextCard) targetCard.pos = (prevCard.pos + nextCard.pos) / 2

      this.UPDATE_CARD(targetCard)
    })
  },
  methods: {
    ...mapMutations(['SET_THEME', 'SET_IS_SHOW_BOARD_MENU']),
    ...mapActions(['FETCH_BOARD', 'UPDATE_CARD', 'UPDATE_BOARD','UPDATE_LIST']),
    fetchData() {
      this.loading = true

      // this.fetchData 가 promise 를 반환해줘야 실행할 수 있어서 return 해줘야함
      return this.FETCH_BOARD({id: this.$route.params.bid})
        .then(() => {
          this.loading = false
        })
    },
    onShowSettings() {
      this.SET_IS_SHOW_BOARD_MENU(true)
    },
    onClickTitle() {
      this.isEditTitle = true
      // 시간을 지연시켜주는 nextTick
      this.$nextTick(() => this.$refs.inputTitle.focus())
    },
    onSubmitTitle() {
      this.isEditTitle = false

      this.inputTitle = this.inputTitle.trim()
      if (!this.inputTitle) return

      const id = this.board.id
      const title = this.inputTitle
      if (title === this.board.title) return
      this.UPDATE_BOARD({id, title})
    },
    setListDragabble() {

      // cDragger 초기화 작업
      if (this.lDragger) this.lDragger.destroy()

      // 유사배열을 NodeList->Array 하고 마우스를 놓았을 때 콘솔 출력
      this.lDragger = dragula([
        ...Array.from(this.$el.querySelectorAll('.list-section'))
      ]).on('drop', (el, wrapper) => {
        const targetList = { id: el.dataset.listId * 1, pos: 65545 }
        let prev = null
        let next = null

        Array.from(wrapper.querySelectorAll('.list'))
          .forEach((el, idx, arr) => {
            const listId = el.dataset.listId * 1
            if (listId === targetList.id) {
              prev = idx > 0 ? {
                id: arr[idx - 1].dataset.listId * 1,
                pos: arr[idx - 1].dataset.listPos * 1
              } : null
              next = idx < arr.length - 1 ? {
                id: arr[idx + 1].dataset.listId * 1,
                pos: arr[idx + 1].dataset.listPos * 1
              } : null
            }
          })

        if (!prev && next) targetList.pos = next.pos / 2
        else if (!next && prev) targetList.pos = prev.pos * 2
        else if (prev && next) targetList.pos = (prev.pos + next.pos) / 2

        this.UPDATE_LIST(targetList)
      })

    }
  }
}
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
}

.board-header input[type=text] {
  width: 200px;
}

.board-header-btn {
  float: right;
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}

.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0, 0, 0, .15);
  cursor: pointer;
}

.board-title {
  font-weight: 700;
  font-size: 18px;
}

.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}

.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}

.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}

.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}

.card-item.gu-transit {
  background-color: #555 !important;
}

.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>
