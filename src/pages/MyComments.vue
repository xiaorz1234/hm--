<template>
  <div class="MyComments">
    <hm-header>我的跟帖</hm-header>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :offset="50"
    >
      <!-- 跟帖的数据 -->
      <div class="item" v-for="item in list" :key="item.id">
        <div class="time">{{item.create_date | time('YYYY-MM-DD hh:mm:ss')}}</div>
        <div class="content">{{item.content}}</div>
        <div class="parent" v-if="item.parent">
          <p>回复:{{item.parent.user.nickname}}</p>
          <p>{{item.parent.content}}</p>
        </div>
        <div class="origin">
          <span class="one-txt-cut">原文:{{item.post.title}}</span>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 当前页
      pageIndex: 1,
      // 每页的跳转
      pageSize: 5
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const res = await this.$axios.get(`/user_comments`, {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      // console.log(data)
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      console.log('到底了')
      setTimeout(() => {
        this.pageIndex++
        this.getComments()
      }, 3000)
    }
  }
}
</script>
<style lang="less" scoped>
.MyComments {
  border-top: 20px solid #555;
  .item {
    line-height: 30px;
    padding: 10px 20px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
    .time {
      font-size: 13px;
      color: #888;
    }
    .content {
      color: #000;
    }
    .origin {
      color: #888;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      .one-text-cut {
        flex: 1;
      }
    }
    .parent {
      margin: 10px 0;
      background-color: #ddd;
      padding: 10px;
      border: 5px;
      p:first-child {
        font-size: 12px;
      }
    }
  }
}
</style>
