<template>
  <div class="list" :data-list-id="data.id" :data-list-pos="data.pos">
    <div class="list-header">
      <input v-if="isEditTitle"
             type="text"
             ref="inputTitle"
             v-model="inputTitle"
             @blur="onBlurTitle"
             @keyup.enter="onSubmitTitle"
             class="form-control input-title">
      <div v-else
           class="list-header-title"
           @click="onClickTitle">{{ data.title }}
      </div>
      <a href="" class="delete-list-btn" @click.prevent="onDeleteList">&times;</a>
    </div>

    <div class="card-list">
      <CardItem v-for="card in data.cards" :key="card.id" :data="card"/>
    </div>

    <div v-if="isAddCard">
      <AddCard @close="close" :list-id="data.id"/>
    </div>
    <div v-else>
      <a href=""
         class="add-card-btn"
         @click.prevent.stop="isAddCard = true">
        &plus; Add a card
      </a>
    </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
import AddCard from "@/components/AddCard"
import CardItem from "@/components/CardItem"

export default {
  name: 'List',
  props: ['data'],
  components: {
    AddCard,
    CardItem
  },
  created() {
    this.inputTitle = this.data.title
  },
  data() {
    return {
      isAddCard: false,
      isEditTitle: false,
      inputTitle: ''
    }
  },
  methods: {
    ...mapActions(['UPDATE_LIST', 'DELETE_LIST']),
    close() {
      this.isAddCard = false
    },
    onClickTitle() {
      this.isEditTitle = true
      this.$nextTick(() => this.$refs.inputTitle.focus())
    },
    onBlurTitle() {
      this.isEditTitle = false
    },
    onSubmitTitle() {
      this.onBlurTitle()
      //api 호출이 있어야함
      this.inputTitle = this.inputTitle.trim()
      if (!this.inputTitle) return

      const id = this.data.id
      const title = this.inputTitle
      if (title === this.data.title) return

      this.UPDATE_LIST({id, title})
    },
    onDeleteList() {
      if (!window.confirm(`delete ${this.data.title} list ?`)) return
      this.DELETE_LIST({id: this.data.id})
    }
  }
}
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}

.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}

.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}

.input-title {
  width: 90%;
}

.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}

.card-list {
  flex: 1 1 auto;
}

.empty-card-item {
  height: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
}

.add-card-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}

.add-card-btn:focus,
.add-card-btn:hover {
  background-color: rgba(0, 0, 0, .1);
}
</style>
