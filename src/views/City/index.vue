<template>
  <div>
    <van-nav-bar title="城市列表" left-arrow @click-left="$router.go(-1)" />
    <van-index-bar :index-list="indexList">
      <div v-for="(item, ind) in indexList" :key="ind" :ref="item">
        <van-index-anchor :index="item">{{
          item === "#" ? "当前城市" : item === "热" ? "热门城市" : item
        }}</van-index-anchor>
        <van-cell
          :title="item1.label"
          v-for="(item1, index) in cityListNew[item]"
          :key="index"
          @click="cutCity(item1)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getHotList, getCityList } from '@/api/city'
export default {
  name: 'City',
  async created () {
    const hotres = await getHotList()
    this.hotList = hotres.data.body
    const cityres = await getCityList()
    this.cityList = cityres.data.body
    console.log()
  },
  data () {
    return {
      hotList: [], // 热门城市
      cityList: [], // 全部城市
      currentCity: this.$store.state.currentCity // 当前城市
    }
  },
  methods: {
    cutCity (obj) {
      this.$store.commit('setCurrentCity', obj)
      this.$router.push('LookHouse')
    }
  },
  computed: {
    // a: {
    //   set () { },
    //   get () { }
    // },
    // 右边索引
    indexList () {
      const intital = []
      this.cityList.forEach((item) => {
        intital.push(item.pinyin.slice(0, 1))
      })
      const setintital = new Set(intital)
      const newintital = Array.from(setintital).sort().map(item => item.toUpperCase())
      newintital.unshift('#', '热')
      return newintital
    },

    // 全部城市包括当前城市和热门城市
    cityListNew () {
      const obj = {}
      this.indexList.forEach(item => {
        obj[item] = this.cityList.filter(item1 => {
          // eslint-disable-next-line eqeqeq
          return item1.pinyin.slice(0, 1).toUpperCase() === item
        })
      })
      obj['热'] = this.hotList
      obj['#'] = [this.currentCity]
      return obj
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-nav-bar {
  position: fixed;
  width: 100%;
  z-index: 99;
}
/deep/.van-nav-bar__title {
  font-size: 18px;
}
.van-index-bar {
  padding-top: 46px;
}
/deep/.van-index-bar__sidebar {
  margin-top: 10px;
  margin-right: 10px;
  .van-index-bar__index {
    display: block;
    width: 18px !important;
    padding: 0 0px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    font-size: 14px;
    margin: 4px 0;
  }
}
/deep/.van-index-bar__index--active {
  color: #fff;
  background-color: #21b97a;
  border-radius: 50%;
}
/deep/.van-index-anchor--sticky {
  color: unset;
}
/deep/.van-index-anchor {
  color: #999;
}
</style>
