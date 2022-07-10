<template>
  <div>
    <van-cell
      v-for="(item, index) in houseList"
      :key="index"
      @click="$router.push(`housingdetails/${item.houseCode}`)"
    >
      <template #title>
        <img :src="'http://liufusong.top:8080' + item.houseImg" alt="" />
      </template>
      <template #default>
        <h3 class="van-ellipsis">{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <div class="xinxi">
          <span v-for="(item1, index) in item.tags" :key="index">{{
            item1
          }}</span>
        </div>
        <div class="red">
          <span>{{ item.price }}</span
          >元/月
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    houseList: {
      type: Array,
      required: true
    }
  },
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

<style scoped lang='less'>
.van-cell {
  height: 120px;
  padding: 20px 0 0 0;
  .van-cell__title {
    flex: unset;
    margin-right: 12px;
    img {
      width: 106px;
      height: 80px;
    }
  }
  .van-cell__value {
    flex: unset;
    text-align: left;
    /deep/h3 {
      font-size: 15px;
      color: #394043;
      line-height: 22px;
    }
    p {
      font-size: 12px;
      color: #afb2b3;
      line-height: 22px;
    }
    .xinxi {
      height: 22px;
      overflow: hidden;
      span {
        color: #39becd;
        background: #e1f5f8;
        display: inline-block;
        font-size: 12px;
        border-radius: 3px;
        padding: 4px 5px;
        margin-right: 5px;
        line-height: 12px;
      }
    }
    .red {
      font-size: 12px;
      color: #fa5741;
      span {
        font-size: 16px;
        font-weight: bolder;
      }
    }
  }
}
</style>
