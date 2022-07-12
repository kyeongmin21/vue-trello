<template>
  <div class="add-card">
    <input type="text" class="form-control" ref="inputText" v-model="inputTitle">
    <button type="submit" class="btn btn-success" :disabled="invalidInput">Add Card</button>
    <a href=""
       class="cancel-add-btn"
       @click.prevent="$emit('close')">&times;</a>
  </div>
</template>

<script>
export default {
  name: "AddCard",
  data() {
    return {
      inputTitle: ''
    }
  },
  computed: {
    invalidInput() {
      // this.inputTitle.trim() 값이 있으면 false, 없으면 true
      return !this.inputTitle.trim()
    }
  },
  mounted() {
    this.$refs.inputText.focus()
  }
}
</script>

<style scoped>
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
