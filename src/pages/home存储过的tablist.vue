<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/personage')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab v-for="item of tablist" :key="item.id" :title="item.name">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="50"
          >
            <hm-post v-for="post in item.posts" :key="post.id" :list="post"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      // active: 0,
      tablist: [],
      pageSize: 5,
      loading: false,
      isLoading: false
    }
  },
  async created () {
    await this.getTabList()
    this.getList()
  },
  methods: {
    // 获取tab栏的数据
    async getTabList () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))

      if (activeList) {
        console.log('我是tab栏的数据', activeList)
        this.tablist = activeList
      } else {
        const res = await this.$axios.get('/category')
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.tablist = data
          console.log('localStorage获取到tab列表', data)
        }
      }
      console.log('VM上面获取到tab列表', this.tablist)
      this.tablist.forEach(item => {
        this.$set(item, 'posts', [])
        item.pageIndex = 1
        item.finished = false
      })
    },
    // 获取新闻数据
    async getList () {
      const id = this.tablist[this.active].id
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.tablist[this.active].pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // console.log('成功获取到新闻列表', data, this.active)
        this.tablist[this.active].posts = [
          ...this.tablist[this.active].posts,
          ...res.data.data
        ]
        this.loading = false

        setTimeout(() => {
          this.isLoading = false
        }, 1000)
        if (data.length < this.pageSize) {
          this.tablist[this.active].finished = true
        }
      }
    },
    onLoad () {
      if (this.tablist[this.active].finished === true) {
        return
      }
      this.tablist[this.active].pageIndex++
      this.getList()
    },
    onRefresh () {
      console.log('下拉刷新了')
      this.loading = true
      this.tablist[this.active].pageIndex = 1
      this.tablist[this.active].posts = []
      this.tablist[this.active].finished = false
      this.getList()
    }
  },
  watch: {
    active (value) {
      this.loading = true
      console.log('active发生了改变', value, this.active)
      if (this.tablist[value].posts.length > 0) return
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  border-top: 20px solid #555;
  .header {
    height: 50px;
    line-height: 50px;
    background-color: red;
    display: flex;
    .left,
    .right {
      color: #fff;
      width: 70px;
      text-align: center;
    }
    .search {
      flex: 1;
      height: 36px;
      line-height: 36px;
      background-color: rgba(255, 255, 255, 0.5);
      margin-top: 7px;
      border-radius: 18px;
      text-align: center;
      color: #fff;
      span {
        margin-left: 10px;
        font-size: 14px;
      }
    }
    .iconnew {
      font-size: 50px;
    }
    .iconwode {
      font-size: 24px;
    }
  }
}
</style>
