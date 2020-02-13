<template>
  <div class="login">
    <div class="close" @click="$router.go(-1)">
      <i class="iconfont iconicon-test"></i>
    </div>
    <div class="logo">
      <i class="iconfont iconnew"></i>
    </div>
    <div class="username">
      <hm-input
        placeholder="用户名/手机号"
        v-model="username"
        :rules="/^1\d{4,10}$/"
        err-msg="输入的用户名格式错误"
      ></hm-input>
    </div>
    <div class="password">
      <hm-input placeholder="请输入密码" v-model="password" :rules="/^1\d{2,10}$/" err-msg="输入的用户名格式错误"></hm-input>
    </div>
    <div class="login">
      <hm-button @click="login">登录</hm-button>
    </div>
    <div class="go-register">
      没有账号?立即
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    // console.log(this.$route)
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async login () {
      // console.log('登录了吗')
      if (!this.username || !this.password) return

      // 发送ajax请求
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      if (res.data.statusCode === 401) {
        this.$toast.fail('用户名或者密码错误')
      } else {
        // console.log(res)
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user.id)
        this.$toast.success('登录成功')
        this.$router.push('/personage')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  padding: 20px;
  .close {
    i {
      font-size: 27px;
    }
  }
  .logo {
    text-align: center;
    i {
      color: #d81e06;
      font-size: 126px;
    }
  }
  .go-register {
    text-align: center;
    font-size: 15px;
  }
}
</style>
