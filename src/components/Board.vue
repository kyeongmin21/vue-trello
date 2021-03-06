<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <input type="text"
                 v-if="isEditTitle"
                 v-model="inputTitle"
                 ref="inputTitle"
          @blur="obSubmitTitle"
          @keyup.enter="obSubmitTitle">
          <span v-else class="board-title" @click="onClickTitle">{{ board.title }}</span>
          <a class="board-header-btn show-menu" href=""
             @click.prevent="onShowSettings">
            ... Show Menu
          </a>
        </div>

        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
              <List :data="list"></List>
            </div>
            <div class="list-wrapper">
              <AddList></AddList>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--상태값에 따라 보여지고 안보여지고 해야함 -->
    <BoardSettings v-if="isShowBoardSettings"></BoardSettings>

    <!--router에서 card 라우터 -->
    <router-view></router-view>

  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import List from './List'
import AddList from './AddList'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'
import BoardSettings from "./BoardSettings"

export default {
  name: 'Board',
  components: {
    List,
    AddList,
    BoardSettings
  },
  data() {
    return {
      dragularCards: null,
      isEditTitle: false,
      inputTitle: ''
    }
  },
  computed: {
    ...mapState({
      board: 'board',
      isShowBoardSettings: 'isShowBoardSettings'
    })
  },
  created() {
    // fetchData가 promise를 반환해야 then()을 쓸 수 있다.
    this.fetchData().then(() => {
      this.inputTitle = this.board.title
      this.SET_THEMA(this.board.bgColor)
    })
    // show Menu를 클릭하고 > home > board 로 들어오면 메뉴가 열려져 있어서 닫혀주는 초기셋팅
    this.SET_IS_SHOW_SETTINGS(false)
  },
  updated() {
    this.updateCard()
  },
  methods: {
    ...mapMutations(['SET_THEMA', 'SET_IS_SHOW_SETTINGS']),
    ...mapActions(['FETCH_BOARD', 'UPDATE_CARD', 'UPDATE_BOARD']),
    fetchData() {
      this.loading = true
      return this.FETCH_BOARD({id: this.$route.params.id})
        .then(() => this.loading = false)
    },
    onShowSettings() {
      this.SET_IS_SHOW_SETTINGS(true)
    },
    onClickTitle() {
      this.isEditTitle = true
      this.$nextTick(() => {
        this.$refs.inputTitle.focus()
      })
    },
    obSubmitTitle() {
      this.isEditTitle = false

      this.inputTitle = this.inputTitle.trim()
      if(!this.inputTitle) return

      const id = this.board.id
      const title = this.inputTitle
      if (title === this.board.title) return

      this.UPDATE_BOARD({id, title})
    },
    updateCard() {
      if (this.dragularCards) this.dragularCards.destroy()
      this.dragularCards = dragula([
        // 유사배열로 만들어줌
        ...Array.from(this.$el.querySelectorAll('.card-list'))
      ]).on('drop', (el, wrapper) => {
        // 어디를 이동해야할지 정보를 담는 카드
        const targetCard = {
          id: el.dataset.cardId * 1,
          pos: 65535
        }

        let prevCard = null
        let nextCard = null

        Array.from(wrapper.querySelectorAll('.card-item'))
          .forEach((el, idx, arr) => {
            const cardId = el.dataset.cardId * 1
            if (cardId === targetCard.id) {
              prevCard = idx > 0 ? {
                id: arr[idx - 1].dataset.cardId * 1,
                pos: arr[idx - 1].dataset.cardPos * 1,
              } : null
              nextCard = idx < arr.length - 1 ? {
                id: arr[idx + 1].dataset.cardId * 1,
                pos: arr[idx + 1].dataset.cardPos * 1
              } : null
            }
          })

        // 앞에 없고 뒤에만 있으니깐 : 맨앞에 있다는 뜻
        if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2
        // 맨뒤에 있는 카드
        else if (prevCard && !nextCard) targetCard.pos = prevCard.pos * 2
        // 중간에 있는 카드
        else if (prevCard && nextCard) targetCard.pos = (prevCard.pos + nextCard.pos) / 2

        this.UPDATE_CARD(targetCard)

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
