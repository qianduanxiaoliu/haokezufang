<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <van-search
        show-action
        label="地址"
        placeholder="请输入小区地址"
        @search="onSearch"
      >
        <template #action>
          <div>搜索</div>
        </template>
      </van-search>
    </div>
    <!-- 轮播图 -->
    <div class="slideshow">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in imgUrl" :key="item.id">
          <a href="">
            <img :src="'http://liufusong.top:8080' + item.imgSrc" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 整租合租 -->
    <div class="tab">
      <van-row>
        <van-col span="6">
          <div>
            <img src="@/assets/img/zhengzu.png" />
            <br />
            <span>整租</span>
          </div>
        </van-col>
        <van-col span="6">
          <div>
            <img src="@/assets/img/hezu.png" />
            <br />
            <span>合租</span>
          </div>
        </van-col>
        <van-col span="6">
          <div>
            <img src="@/assets/img/dituzhaofang.png" />
            <br />
            <span>地图找房</span>
          </div>
        </van-col>
        <van-col span="6">
          <div>
            <img src="@/assets/img/quchuzu.png" />
            <br />
            <span>去出租</span>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getImage } from '@/api/home'
export default {
  async created () {
    console.log(await getImage())
    const res = await getImage()
    this.imgUrl = res.data.body
  },
  data () {
    return {
      imgUrl: []
    }
  },
  methods: {
    onSearch () { }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.search {
  position: fixed;
  top: 20px;
  width: 100%;
  z-index: 1;
}
.van-swipe-item {
  img {
    width: 100%;
  }
}
.tab {
  padding: 10px 0;
  font-size: 14px;
  text-align: center;
  img {
    width: 60px;
    height: 60px;
  }
  span {
    display: block;
    margin: 12px 0;
  }
}
</style>
