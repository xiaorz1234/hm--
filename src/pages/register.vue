<template>
  <div class="register">
    <div class="close"  @click="$router.go(-1)">
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
    <div class="nickname">
      <hm-input placeholder="昵称" v-model="nickname" :rules="/^\D{4,10}$/" err-msg="输入的昵称格式错误"></hm-input>
    </div>
    <div class="password">
      <hm-input placeholder="请输入密码" v-model="password" :rules="/^1\d{4,10}$/" err-msg="输入的密码格式错误"></hm-input>
    </div>
    <div class="login">
      <hm-button @click="register">注册</hm-button>
    </div>
    <div class="go-login">
      已有账号?立即
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      username: '',
      password: '',
      nickname: ''
    }
  },
  methods: {
    async register () {
      // 发送ajax请求
      const res = await this.$axios.post('/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      console.log(res)
      if (res.data.statusCode === 400) {
        this.$toast.fail('用户名已经存在')
      } else {
        this.$toast.success('注册成功')

        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register {
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
  .go-login {
    text-align: center;
    font-size: 15px;
  }
}
</style>
