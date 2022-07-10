<template>
  <div>
    <van-nav-bar title="房源管理" left-arrow @click-left="$router.go(-1)">
    </van-nav-bar>
    <House :houseList="houseList"></House>
  </div>
</template>

<script>
import { getMyHouse } from '@/api/user'
import House from '@/components/House.vue'
export default {
  async created () {
    const res = await getMyHouse()
    console.log(res)
    this.houseList = res.data.body
  },
  data () {
    return {
      houseList: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: { House }
}
</script>

<style scoped lang='less'>
</style>
