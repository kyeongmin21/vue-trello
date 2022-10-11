<template>
  <div class="add-card">

    <form @submit.prevent="onSubmit">
      <input class="form-control"
             type="text"
             ref="inputText"
             v-model="inputTitle">

      <button class="btn btn-success"
              type="submit"
              :disabled="invalidInput">Add Card
      </button>

      <a href=""
         class="cancel-add-btn"
         @click.prevent="close">&times;</a>
    </form>

  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "AddCard",
  props: ['listId'],
  data() {
    return {
      inputTitle: ''
    }
  },
  computed: {
    invalidInput() {
      return !this.inputTitle.trim()
    }
  },
  mounted() {
    this.$refs.inputText.focus()
    this.setupClickOutside(this.$el)
  },
  methods: {
    ...mapActions(['ADD_CARD']),
    close() {
      this.$emit('close')
    },
    onSubmit() {
      if (this.invalidInput) return
      const {inputTitle, listId} = this
      const pos = this.newCardPos()
      this.ADD_CARD({title: inputTitle, listId, pos})
        .finally(() => this.inputTitle = '')
    },
    newCardPos() {
      const currentList = this.$store.state.board.lists.filter(item => item.id === this.listId)[0]
      if (!currentList) return 65535
      const {cards} = currentList
      if (!cards.length) return 65535
      return cards[cards.length - 1].pos * 2
    },
    setupClickOutside(el) {
      document.querySelector('body').addEventListener('click', e => {
        if (el.contains(e.target)) return
        this.close()
      })
    }
  }
}
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}

.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}

.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>
