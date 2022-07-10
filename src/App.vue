<template>
  <div>
    <!-- 一级路由 -->
    <keep-alive exclude="HousingDetails">
      <router-view></router-view>
    </keep-alive>
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
</style>
