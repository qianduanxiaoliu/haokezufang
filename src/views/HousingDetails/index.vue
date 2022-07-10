<template>
  <div>
    <!-- 顶部导航栏 -->
    <van-nav-bar
      :title="houseList.community"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 轮播图 -->
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in houseList.houseImg" :key="index"
          ><img :src="'http://liufusong.top:8080' + item" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>
    <!-- 详情页 -->
    <div class="detil">
      <h3>{{ houseList.title }}</h3>
      <div class="tedian">
        <span v-for="(item, index) in houseList.tags" :key="index">金体贴</span>
      </div>
      <!-- 价格房型面积 -->
      <div class="size">
        <div class="left three">
          <p class="big">
            <span>{{ houseList.price }}</span
            >/月
          </p>
          <div>租金</div>
        </div>
        <div class="center three">
          <p>{{ houseList.roomType }}</p>
          <div>房型</div>
        </div>
        <div class="right three">
          <p>
            <span>{{ houseList.size }}</span
            >平米
          </p>
          <div>面积</div>
        </div>
      </div>
      <!-- 装修楼层等 -->
      <div class="traut">
        <div class="left">
          <div class="top">
            <p>装修:<span>精装</span></p>
          </div>
          <div class="bottom">
            <p>
              楼层:<span>{{ houseList.floor }}</span>
            </p>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <p>
              <!-- 判断是否获取到数据,获取到则渲染 -->
              朝向:<span>{{
                houseList.oriented && houseList.oriented[0]
              }}</span>
            </p>
          </div>
          <div class="bottom">
            <p>类型:<span>普通住宅</span></p>
          </div>
        </div>
      </div>
    </div>

    <!-- 地图 -->
    <div class="maptitle">
      <div class="title">
        小区: <span>{{ houseList.community }}</span>
      </div>
      <div class="map" id="container"></div>
    </div>

    <!-- 房屋配套 -->
    <div class="mating">
      <div class="title">房屋配套</div>
      <div class="icon">
        <ul>
          <li v-for="(item, index) in houseList.supporting" :key="index">
            <i class="toutiao" :class="`toutiao-${pinyin[index]}`"></i>
            <p>{{ item }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 房屋概况 -->
    <div class="general">
      <div class="title">房屋概况</div>
      <div class="houseOwner">
        <div class="left">
          <div class="one">
            <img src="@/assets/img/avatar.png" alt="" />
          </div>
          <div class="two">
            <p>王女士</p>
            <div>
              <i class="toutiao toutiao-dunpaibaoxianrenzheng"></i>已认证为房主
            </div>
          </div>
        </div>
        <div class="right">
          <van-button plain type="primary">发消息</van-button>
        </div>
      </div>
      <div class="explain">{{ this.houseList.description }}</div>
    </div>
  </div>
</template>

<script>
import { getHouseMessage } from '@/api/lookHouse'

// 将文字转换为拼音
const pinyin = require('js-pinyin')
pinyin.setOptions({ checkPolyphone: false, charCase: 0 })
export default {
  name: 'HousingDetails',

  async created () {
    try {
      // 发送ajax请求获取房屋详情数据
      const res = await getHouseMessage(this.$route.params.id)
      this.houseList = res.data.body
      // 在获取到数据后调用 不然会报错找不到经纬度
      this.map()
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      houseList: {} // 房屋的具体信息

    }
  },
  methods: {
    // 地图
    map () {
      // 引入地图构造函数
      const { BMapGL } = window
      const map = new BMapGL.Map('container') // 创建map(地图) 实例
      const point = new BMapGL.Point(this.houseList.coord.longitude, this.houseList.coord.latitude)
      map.centerAndZoom(point, 15) // 初始化地图 设置中心点和地图级别
      map.enableScrollWheelZoom(true) // 开启地图滚轮缩放
      const content = this.houseList.community
      const label = new BMapGL.Label(content, { // 创建文本标注
        position: point, // 设置标注的地理位置
        offset: new BMapGL.Size(10, 20) // 设置标注的偏移量
      })
      map.addOverlay(label) // 将标注添加到地图中
      label.setStyle({ // 设置label的样式
        color: '#000',
        fontSize: '12px',
        border: '1px solid #1E90FF'
      })
    }
  },
  computed: {

    // 将获取到的房屋配套信息转换为拼音
    pinyin () {
      const aaa = this.houseList.supporting.map(item => {
        return pinyin.getFullChars(item).toLowerCase()
      })
      return aaa
    }
  },
  watch: {},
  filters: {},
  components: {},
  mounted () {

  }
}
</script>

<style scoped lang='less'>
#container {
  height: 145px;
}
.swipe {
  height: 252px;
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 252px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    img {
      height: 252px;
    }
  }
}

// 详情页
.detil {
  padding: 15px;
  h3 {
    font-weight: 400;
    font-size: 16px;
    color: #333;
    margin: 16px 0;
  }
  .tedian {
    height: 20px;
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
  // 价格房型面积部分
  .size {
    height: 84px;
    margin: 15px 0;
    padding: 15px 0;
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      .big {
        font-size: 12px;
        font-weight: 400;
        color: #fa5741;
        span {
          font-size: 18px;
          font-weight: bolder;
        }
      }
    }
    .three {
      flex: 1;
      text-align: center;
      p {
        font-size: 18px;
        font-weight: bolder;
        color: #fa5741;
        height: 27px;
      }
      div {
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        color: #999;
      }
    }
  }

  // 装修楼层等
  .traut {
    display: flex;
    p {
      color: #999;
      line-height: 26px;
      font-size: 13px;
      span {
        color: #333;
        padding-left: 10px;
      }
    }
    .left {
      flex: 1;
    }
    .right {
      flex: 1;
    }
  }
}

// 地图
.maptitle {
  .title {
    height: 44px;
    margin: 0 11.25px;
    font-size: 14px;
    color: #666;
    line-height: 44px;
    span {
      color: #333;
    }
  }
  .map {
    height: 145px;
  }
}

// 房屋配套
.mating {
  padding: 0 10px;
  margin-bottom: 10px;
  .title {
    height: 47.25px;
    padding: 15px 0;
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 600;
    line-height: 17.25px;
  }
  .icon {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 71px;
        height: 51px;
        margin: 10px 0;
        text-align: center;
        i {
          font-size: 23px;
        }
        p {
          font-size: 14px;
          line-height: 23px;
          color: #333;
        }
      }
    }
  }
}

// 房屋概况
.general {
  margin: 10px 0;
  padding: 0 10px;
  .title {
    height: 52px;
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 10px;
    padding: 15px 0;
    border-bottom: 1px solid #cecece;
  }
  .houseOwner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .left {
      display: flex;
      .one {
        img {
          width: 52px;
          height: 52px;
          margin: 10px 10px 0 0;
        }
      }
      .two {
        padding: 15px 0 0 5px;
        p {
          font-size: 14px;
          line-height: 21px;
        }
        div {
          font-size: 12px;
          color: #fa5741;
          i {
            margin-right: 6px;
            font-size: 20px;
          }
        }
      }
    }
    .right {
      .van-button {
        height: 30px;
        padding: 3px 15px;
      }
    }
  }
  .explain {
    font-size: 14px;
  }
}
</style>
