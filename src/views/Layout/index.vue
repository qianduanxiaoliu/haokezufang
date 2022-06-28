<template>
  <div>
    <div class="content">
      <!-- 二级路由 -->
      <router-view></router-view>
    </div>
    <!-- 底部tabbar栏 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/lookhouse" icon="search"
        >找房</van-tabbar-item
      >
      <van-tabbar-item replace to="/message" icon="description"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
.content {
  padding-bottom: 50px;
}
</style>
