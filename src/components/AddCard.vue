<template>
  <div class="add-card">
    <input type="text" class="form-control">
    <button type="submit" class="btn btn-success">Add Card</button>
    <a href="" class="cancel-add-btn">&times;</a>
  </div>
</template>

<script>
export default {
  name: "AddCard",
  data() {
    return {
      inputTitle: ''
    }
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
