import Vue from 'vue'
import Vuex from 'vuex'
import {board, auth, card, setAuthInHeader} from '@/api';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAddBoard: false,
    boards: [],
    board: {},
    token: null
  },
  getters: {
    isAuth(state) {
      return !!state.token
    }
  },
  mutations: {
    SET_IS_ADD_BOARD(state, toggle) {
      state.isAddBoard = toggle
    },
    SET_BOARDS(state, boards) {
      state.boards = boards
    },
    SET_BOARD(state, board) {
      state.board = board
    },
    LOGIN(state, token) {
      if (!token) return
      state.token = token // state 갱신
      localStorage.setItem('token', token) // 로컬스토리지에 토큰 저장
      setAuthInHeader(token) // 리퀘스트 헤더에 저장
    },
    LOGOUT(state) {
      state.token = null
      delete localStorage.token
      setAuthInHeader(null)
    }
  },
  actions: {
    ADD_BOARD(_, {title}) {
      // 응답값으로 board id를 넘겨야 해서
      return board.create(title).then(data => data.item)
    },
    FETCH_BOARDS({commit}) {
      return board.fetch()
        .then(data => {
          commit('SET_BOARDS', data.list)
        })
    },
    FETCH_BOARD({commit}, {id}) {
      return board.fetch(id)
        .then(data => {
          commit('SET_BOARD', data.item)
        })
    },
    LOGIN({commit}, {email, password}) {
      return auth.login(email, password)
        .then(({accessToken}) => {
          commit('LOGIN', accessToken)
        })
    },
    ADD_CARD({dispatch, state}, {title, listId, pos}) {
      return card.create(title, listId, pos)
        .then(() => dispatch('FETCH_BOARD', {id: state.board.id}))
    }
  },
})

const {token} = localStorage
store.commit('LOGIN', token)

export default store
