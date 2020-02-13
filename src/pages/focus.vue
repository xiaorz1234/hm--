<template>
  <div class="focus">
    <hm-header>我的关注</hm-header>
    <div class="focusinfo" v-for="item in list" :key="item.id">
      <div class="left">
        <img :src="$axios.defaults.baseURL+item.head_img" alt />
      </div>
      <div class="center">
        <p class="title">{{item.nickname}}</p>
        <p class="time">{{item.create_date | time}}</p>
      </div>
      <div class="right">
        <button @click="unfocus(item.id)">取消关注</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await this.$axios.get(`/user_follows`)
      this.list = res.data.data
    },
    async unfocus (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要取消该关注吗?'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        if (res.data.statusCode === 200) {
          this.$toast.success('取消关注成功')
          this.getList()
        }
      } catch {
        this.$toast.success('取消操作')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.focus {
  border-top: 20px solid #555;
  .focusinfo {
    height: 80px;
    border-bottom: 1px solid #ccc;
    display: flex;
    padding: 10px;
    .left {
      height: 40px;
      width: 40px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    .center {
      flex: 1;
      padding-left: 20px;
      .title {
        font-size: 14px;
        color: #000;
      }
      .time {
        color: #999;
        font-size: 12px;
      }
    }
    .right {
      button {
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 12px;
      }
    }
  }
}
</style>
