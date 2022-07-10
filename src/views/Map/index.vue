<template>
  <div>
    <van-nav-bar title="地图找房" left-arrow @click-left="$router.go(-1)" />
    <div class="map" id="container"></div>
  </div>
</template>

<script>
import { getMapList } from '@/api/city'
let Vue = this
export default {

  created () {
    Vue = this
    this.map(this.$store.state.currentCity.value, this.size)
    console.log(this)
  },
  data () {
    return {
      mapList: [],
      size: 10
    }
  },
  methods: {
    // 获取房源数据
    async map (id, size) {
      try {
        const res = await getMapList(id)
        console.log(res)
        this.mapList = res.data.body
        this.getMap(size)
      } catch (error) {
        console.log(error)
      }
    },

    // 地图
    getMap (size) {
      if (!this.mapList[0].coord) return
      // 引入地图构造函数
      const { BMapGL } = window
      const map = new BMapGL.Map('container') // 创建map(地图) 实例
      const point = new BMapGL.Point(this.mapList[0].coord.longitude, this.mapList[0].coord.latitude)
      map.centerAndZoom(point, size) // 初始化地图 设置中心点和地图级别
      map.enableScrollWheelZoom(true) // 开启地图滚轮缩放
      // const content = this.mapList[0].label
      // const label = new BMapGL.Label(content, { // 创建文本标注
      //   position: point, // 设置标注的地理位置
      //   offset: new BMapGL.Size(10, 20) // 设置标注的偏移量
      // })
      // map.addOverlay(label) // 将标注添加到地图中
      this.mapList.forEach(item => {
        const point = new BMapGL.Point(item.coord.longitude, item.coord.latitude)
        const content = `<span>${item.label}</span><br/><span>${item.count}套</span>`
        const label = new BMapGL.Label(content, { // 创建文本标注
          position: point, // 设置标注的地理位置
          offset: new BMapGL.Size(10, 20) // 设置标注的偏移量
        })
        label.addEventListener('click', function () {
          Vue.size += 3
          Vue.map(item.value, Vue.size)
        })

        map.addOverlay(label) // 将标注添加到地图中
        label.setStyle({ // 设置label的样式
          color: '#fff',
          borderColor: '#fff',
          backgroundColor: '#23bb78',
          padding: '14px 0 0',
          fontSize: '12px',
          textAlign: 'center',
          boxSizing: ' border-box',
          lineHeight: '18px',
          height: '70px',
          width: '70px',
          borderRadius: '50%',
          fontFamily: '微软雅黑'
        })
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
#container {
  height: 100vh;
}
</style>
