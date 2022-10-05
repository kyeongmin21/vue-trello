<template>
  <modal>
    <div slot="header">
      <h2>
        Create new board
        <a href="" class="modal-default-button"
           @click.prevent="close">&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form"
            @submit.prevent="addBoard">
        <input class="form-control" type="text" v-model="input" ref="input">
      </form>
    </div>
    <div slot="footer">
      <button class="btn"
              type="submit"
              :class="{ 'btn-success': valid }"
              form="add-board-form"
              :disabled="!valid">
        Create Board
      </button>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal'
import {mapActions, mapMutations} from "vuex"

export default {
  name: "AddBoard",
  components: {
    Modal
  },
  data() {
    return {
      input: '',
      valid: false
    }
  },
  watch: {
    input(value) {
      this.valid = value.trim().length > 0
    }
  },
  mounted() {
    this.$refs.input.focus()
  },
  methods: {
    ...mapMutations(['SET_IS_ADD_BOARD']),
    ...mapActions(['ADD_BOARD', 'FETCH_BOARDS']),
    close() {
      this.SET_IS_ADD_BOARD(false)
    },
    addBoard() {
      this.close()
      this.ADD_BOARD({title: this.input})
        .then(({id}) => this.$router.push(`/board/${id}`))
    }
  }
}
</script>
