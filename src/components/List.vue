<template>
  <div class="list">
    <div class="list-header">
      <input type="text"
             v-if="isEditTitle"
             class="form-control input-title"
             ref="inputTitle"
      v-model="inputTitle">
      <div v-else
           class="list-header-title"
           @click="onClickTitle">
        {{ data.title }}
      </div>
    </div>

    <div class="card-list">
      <CardItem v-for="card in data.cards" :key="card.id" :data="card"></CardItem>
    </div>

    <div v-if="isAddCard">
      <AddCard :list-id="data.id"
               @close="isAddCard = false"></AddCard>
    </div>
    <div v-else>
      <a href="" class="add-card-btn" @click.prevent.stop="isAddCard = true">
        &plus; Add a card..
      </a>
    </div>

  </div>
</template>

<script>
import AddCard from "./AddCard"
import CardItem from "./CardItem"

export default {
  name: "List",
  components: {
    AddCard,
    CardItem
  },
  props: ['data'],
  created() {
    // title 클릭했을 때도 todo라는 글씨가 나오게 하기
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
    onClickTitle() {
      this.isEditTitle = true
      // 다음 렌더링사이클에서 돌아가도록 nextTick 감싸준다.
      this.$nextTick(() => this.$refs.inputTitle.focus())
    }
  }
}
</script>

<style scoped>
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
  overflow-y: scroll;
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
