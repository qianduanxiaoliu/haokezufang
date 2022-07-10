<template>
  <div>
    <!-- 搜索 -->
    <div class="search">
      <div class="left">
        <div class="silt" @click="$router.push('City')">
          <span
            >{{ $store.state.currentCity.label
            }}<i class="toutiao toutiao-sanjiao1"></i
          ></span>
        </div>
        <div class="sousuo">
          <i class="toutiao toutiao-Search-20"></i>
          <span>请输入小区或地址</span>
        </div>
      </div>
      <div class="right" @click="$router.push(`map`)">
        <i class="toutiao toutiao-hyditu"></i>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swipe">
      <div class="slideshow">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in imgUrl" :key="item.id">
            <a href="">
              <img :src="'http://liufusong.top:8080' + item.imgSrc" />
            </a>
          </van-swipe-item>
        </van-swipe>
      </div>
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
          <div @click="$router.push('Issue')">
            <img src="@/assets/img/quchuzu.png" />
            <br />
            <span>去出租</span>
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 租房小组 -->
    <div class="bottom">
      <div class="title">
        <h3>租房小组</h3>
        <span>更多</span>
      </div>
      <div class="message">
        <div class="box" v-for="item in groupsList" :key="item.id">
          <div class="left">
            <img :src="'http://liufusong.top:8080' + item.imgSrc" alt="" />
          </div>
          <div class="right">
            <p>{{ item.title }}</p>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getImage, getGroups } from '@/api/home'
export default {
  name: 'Home',
  async created () {
    const res = await getImage()
    this.imgUrl = res.data.body
    const res1 = await getGroups()
    this.groupsList = res1.data.body
  },
  data () {
    return {
      imgUrl: [],
      groupsList: []
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
  width: 94%;
  height: 34px;
  margin: 0 3%;
  z-index: 1;
  font-size: 14px;
  line-height: 34px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    flex: 10;
    border-radius: 5px;
    padding: 5px 5px 5px 8px;
    // line-height: 24px;
    .silt {
      padding-right: 10px;
      i {
        font-size: 12px;
        color: #7f7f80;
      }
    }
    .sousuo {
      height: 17px;
      border-left: 1px solid #9c9fa1;
      color: #9c9fa1;
      line-height: 17px;
      i {
        font-size: 15px;
        padding: 0 6px 0 12px;
      }
    }
  }
  .right {
    flex: 1;
    text-align: center;
    i {
      font-size: 25px !important;
      color: #fff;
    }
  }
}
.swipe {
  height: 212px;
  .van-swipe-item {
    height: 212px;
    img {
      width: 100%;
    }
  }
}

.tab {
  padding: 10px 0;
  font-size: 14px;
  text-align: center;
  background-color: #fff;
  img {
    width: 60px;
    height: 60px;
  }
  span {
    display: block;
    margin: 12px 0;
  }
}

.bottom {
  padding: 0 10px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      font-size: 15px;
      margin: 15px 0 15px 10px;
    }
    span {
      color: #787d82;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .message {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .box {
      display: flex;
      width: 48%;
      height: 60px;
      background-color: #fff;
      margin-bottom: 20px;
      .left {
        width: 52px;
        margin: 0 10px;
        img {
          height: 50px;
        }
      }
      .right {
        padding-top: 15px;
        /deep/p {
          font-size: 14px;
          color: #333;
          line-height: 14px;
        }
      }
    }
  }
}
</style>
