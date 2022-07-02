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
        Create Board</button>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal'

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
    close () {
      this.$emit('close')
    },
    addBoard () {
      this.$emit('close')
      this.$emit('submit', this.input)
    }

  }
}
</script>

<style scoped>

</style>
