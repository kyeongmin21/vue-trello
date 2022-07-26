<template>
  <div class="login">
    <h2>Log in to Trello</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input id="email"
               class="form-control"
               type="text"
               name="email"
               v-model="email"
               autofocus
               placeholder="test@test.com"/>
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password"
               class="form-control"
               type="password"
               v-model="password"
               placeholder="123123"/>
      </div>
      <button class="btn"
              :class="{'btn-success': !invalidForm}"
              type="submit"
              :disabled="invalidForm">Log In</button>
    </form>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import {auth, setAuthInHeader} from '../api'


export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      rPath: ''
    }
  },
  computed: {
    invalidForm() {
      return !this.email || !this.password
    }
  },
  created() {
    // 아무것도 없을 때는 / 홈으로 이동
    this.rPath = this.$route.query.rPath || '/'
  },
  methods: {
    onSubmit() {
      auth.login(this.email, this.password)
        .then(data => {
          // localStorage에 토큰정보 저장
          localStorage.setItem('token', data.accessToken)
          // 헤더값을 토큰으로 셋팅
          setAuthInHeader(data.accessToken)
          this.$router.push(this.rPath)
        })
        .catch(err => {
          this.error = err.data.error
        })
    }
  }
}
</script>

<style>
.login {
  width: 400px;
  margin: 0 auto;
}

.error {
  color: #f00;
}
</style>
