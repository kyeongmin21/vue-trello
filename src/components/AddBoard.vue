<template>
  <modal>
    <div slot="header">
      <h2>
        Create new board
        <a href="" class="modal-default-button"
           @click.prevent="SET_IS_ADD_BOARD(false)">&times;</a>
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
        Create Board</button>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal'
import { mapMutations } from 'vuex'

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
  methods: {
    ...mapMutations(['SET_IS_ADD_BOARD']),
    addBoard () {
      this.SET_IS_ADD_BOARD(false)
      this.$emit('submit')
      this.$store.dispatch('ADD_BOARD', { title: this.input })
    }

  }
}
</script>

<style scoped>

</style>
