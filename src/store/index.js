import Vue from 'vue'
import Vuex from 'vuex'
import { board } from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAddBoard: false
  },
  mutations: {
    SET_IS_ADD_BOARD (state, toggle) {
      state.isAddBoard = toggle
    }
  },
  actions: {
    ADD_BOARD (_, { title }) {
      return board.create(title)
    }
  },
  modules: {
  }
})


