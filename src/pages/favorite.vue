<template>
  <div class="favorite">
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="item in list" :key="item.id" :list="item"></hm-post>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  async created () {
    const res = await this.$axios.get(`/user_star`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.list = data
      data.forEach(item => {
        item.comment_length = item.comments.length
      })
    }
  }
}
</script>

<style lang="less" scoped>
.favorite {
  border-top: 20px solid #555;
  .item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 13px;
      .botton {
        color: #888;
        span:last-child {
          margin-left: 20px;
        }
      }
    }
    img {
      width: 120px;
      height: 75px;
      object-fit: cover;
    }
  }
}
</style>
