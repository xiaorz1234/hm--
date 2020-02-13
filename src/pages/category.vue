<template>
  <div class="category">
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="title">点击删除以下频道(至少要有3个选项)</div>
      <div class="list">
        <div
          class="item"
          v-for="(item,index) in activeList"
          :key="item.id"
          @click="del(index)"
        >{{item.name}}</div>
      </div>

      <div class="title">点击添加以下频道</div>
      <div class="list">
        <div
          class="item"
          v-for="(item,index) in deactiveList"
          :key="item.id"
          @click="add(index)"
        >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  created () {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))

    if (activeList && deactiveList) {
      this.activeList = activeList

      this.deactiveList = deactiveList
    } else {
      this.getlist()
    }
  },
  methods: {
    async getlist () {
      const res = await this.$axios.get(`/category`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.activeList = data
        console.log(data)
      }
    },
    del (index) {
      if (this.activeList.length <= 3) {
        return
      }
      this.deactiveList.push(this.activeList[index])
      this.activeList.splice(index, 1)
    },
    add (index) {
      console.log(index)
      this.activeList.push(this.deactiveList[index])
      this.deactiveList.splice(index, 1)
    }
  },
  watch: {
    activeList () {
      localStorage.setItem('activeList', JSON.stringify(this.activeList))
      localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
    }
  }
}
</script>

<style lang="less" scoped>
.category {
  border-top: 20px solid #555;
  .content {
    padding: 10px;
    .title {
      color: #888;
      padding: 10px 0;
    }
    .list {
      overflow: hidden;
      .item {
        float: left;
        width: 60px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #ccc;
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }
  }
}
</style>
