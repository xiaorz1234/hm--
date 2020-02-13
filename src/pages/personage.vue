
<template>
  <div class="personage">
    <div class="user-info" @click="$router.push('/editPersonage')">
      <div class="imgpt">
        <img :src="avatar" alt />
      </div>
      <div class="info">
        <p>
          <i v-if="personage.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{personage.nickname}}</span>
        </p>
        <p>{{personage.create_date |time}}</p>
      </div>
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <hm-nav name="我的关注" desc="关注的用户" @click="$router.push('/focus')"></hm-nav>
      <hm-nav name="我的跟帖" desc="跟帖/回复" @click="$router.push('/mycomments')"></hm-nav>
      <hm-nav name="我的收藏" desc="文章/视频" @click="$router.push( '/favorite')"></hm-nav>
      <hm-nav name="栏目管理" desc="添加/删除" @click="$router.push( '/category')"></hm-nav>
      <hm-nav name="设置" @click="$router.push('/editPersonage')"></hm-nav>
      <hm-button class="loginout" @click="out">退出登录</hm-button>
    </div>
  </div>
</template>

<script>
import img from '../images/01.jpg'
export default {
  data () {
    return {
      personage: {}
    }
  },
  computed: {
    avatar () {
      if (this.personage.head_img) {
        return this.$axios.defaults.baseURL + this.personage.head_img
      } else {
        return img
      }
    }
  },
  async created () {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    this.personage = res.data.data
    // console.log(token, userId)
    // console.log(res)
    // console.log(res.data.data)
    // console.log(this.personage)
  },
  methods: {
    async out () {
      try {
        await this.$dialog
          .confirm({
            title: '温馨提示',
            message: '你确认要退出吗?'
          })
          .then(() => {
            // on confirm
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            this.$router.push('/login')
          })
      } catch {
        this.$toast('操作取消')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.personage {
  .user-info {
    padding: 20px;
    border-top: 20px solid #555;
    border-bottom: 5px solid #ccc;
    display: flex;
    .imgpt {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .icon {
      width: 30px;
      i {
        line-height: 70px;
      }
    }
    .info {
      flex: 1;
      margin-left: 20px;
      p:first-child {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #000;
      }
      p:last-child {
        font-size: 12px;
      }
      .iconxingbienan {
        color: rgb(171, 213, 242);
      }
      .iconxingbienv {
        color: pink;
      }
    }
  }
  .list {
    padding: 0 25px;
    .loginout {
      margin-top: 20px;
    }
  }
}
</style>
