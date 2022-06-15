<template>
  <div id="app">
    <!-- header -->
    <navbar></navbar>
    <!-- 보여지는 컴포넌트들 -->
    <router-view></router-view>
  </div>
</template>

<script>
 import Navbar from "./components/Navbar";
 export default {
   name: 'app',
   components: {
     Navbar
   },
   data () {
     return {

     }
   }
 }
</script>
