<template>
  <div class="follow">
    <hm-header>精彩跟贴</hm-header>
    <hm-comment v-for="item in commentList" :key="item.id" :list="item"></hm-comment>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: ''
    }
  },
  created () {
    this.getcomment()
  },
  methods: {
    async getcomment () {
      // const id = this.$route.params.id
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.follow {
  border-top: 20px solid #555;
}
</style>
