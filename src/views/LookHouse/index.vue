<template>
  <div>
    <!-- 搜索 -->
    <div class="top">
      <div class="search">
        <van-icon name="arrow-left" @click="$router.push('Home')" />
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
    </div>
    <!-- 下拉选项 -->
    <div class="select">
      <van-sticky>
        <van-dropdown-menu
          duration="0.2"
          active-color="#4eb979"
          :overlay="!show"
        >
          <!-- 区域 -->
          <van-dropdown-item title="区域" ref="item1">
            <van-picker ref="itemq1" :columns="columns1" @change="onChange" />
            <van-row>
              <van-col span="8">
                <van-button block @click="onCancel1">取消</van-button>
              </van-col>
              <van-col span="16">
                <van-button block @click="onCancel1">确认</van-button>
              </van-col>
            </van-row>
          </van-dropdown-item>
          <!-- 方式 -->
          <van-dropdown-item title="方式" ref="item2">
            <van-picker
              ref="itemq2"
              :columns="columns2"
              defaultIndex="0"
              @change="rentType = $refs.itemq2.getValues()[0].value"
            >
            </van-picker>
            <van-row>
              <van-col span="8">
                <van-button block @click="onCancel2">取消</van-button>
              </van-col>
              <van-col span="16">
                <van-button block @click="onCancel2">确认</van-button>
              </van-col>
            </van-row>
          </van-dropdown-item>
          <!-- 价格 -->
          <van-dropdown-item title="价格" ref="item3">
            <van-picker
              ref="itemq3"
              :columns="columns3"
              defaultIndex="0"
              @change="price = $refs.itemq3.getValues()[0].value"
            >
            </van-picker>
            <van-row>
              <van-col span="8">
                <van-button block @click="onCancel3">取消</van-button>
              </van-col>
              <van-col span="16">
                <van-button block @click="onCancel3">确认</van-button>
              </van-col>
            </van-row>
          </van-dropdown-item>
          <!-- 筛选 -->
          <van-dropdown-item title="筛选" ref="item4" @open="show = true">
          </van-dropdown-item>
        </van-dropdown-menu>
      </van-sticky>
    </div>
    <!--房屋信息  -->
    <div class="house">
      <van-cell-group>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="(item, index) in houseList"
              :key="index"
              @click="$router.push(`housingdetails/${item.houseCode}`)"
            >
              <template #title>
                <img
                  :src="'http://liufusong.top:8080' + item.houseImg"
                  alt=""
                />
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
          </van-list>
        </van-pull-refresh>
      </van-cell-group>
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '80%' }"
    >
      <!-- 户型 -->
      <van-checkbox-group v-model="result1" direction="horizontal">
        <van-cell title="户型"></van-cell>
        <van-checkbox
          :name="item.value"
          v-for="(item, index) in allCondition.roomType"
          :key="index"
        >
          <template #icon>
            <div style="width=20px heigth=20px">{{ item.text }}</div>
          </template>
        </van-checkbox>
      </van-checkbox-group>
      <!-- 朝向 -->
      <van-checkbox-group v-model="result2" direction="horizontal">
        <van-cell title="户型"></van-cell>
        <van-checkbox
          :name="item.value"
          v-for="(item, index) in allCondition.oriented"
          :key="index"
        >
          <template #icon>
            <div style="width=20px heigth=20px">{{ item.text }}</div>
          </template>
        </van-checkbox>
      </van-checkbox-group>
      <!-- 楼层 -->
      <van-checkbox-group v-model="result3" direction="horizontal">
        <van-cell title="户型"></van-cell>
        <van-checkbox
          :name="item.value"
          v-for="(item, index) in allCondition.floor"
          :key="index"
        >
          <template #icon>
            <div style="width=20px heigth=20px">{{ item.text }}</div>
          </template>
        </van-checkbox>
      </van-checkbox-group>
      <!-- 房屋亮点 -->
      <van-checkbox-group v-model="result4" direction="horizontal">
        <van-cell title="户型"></van-cell>
        <van-checkbox
          :name="item.value"
          v-for="(item, index) in allCondition.characteristic"
          :key="index"
        >
          <template #icon>
            <div style="width=20px heigth=20px">{{ item.text }}</div>
          </template>
        </van-checkbox>
      </van-checkbox-group>
      <van-row class="bottombox" type="position">
        <van-col span="8">
          <van-button block @click="onCancel3">取消</van-button>
        </van-col>
        <van-col span="16">
          <van-button block @click="getHouse">确认</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script >
import { getCondiTion, getHouses } from '@/api/lookHouse'
export default {
  name: 'LookHouse',
  async created () {
    // 获取房屋信息
    this.getHouse()
    // 传入城市id获取 所有房屋查询条件
    const res = await getCondiTion(this.$store.state.currentCity.value)
    const reg1 = /label/gi
    const reg2 = /不限",/gi
    // 先转换为JSON字符串 用替换的方法将数据转换为vant组件库可以使用的格式
    const res1 = JSON.stringify(res.data.body)
    this.allCondition = JSON.parse(res1.replace(reg1, 'text').replace(reg2, '不限","children":[""],'))
  },
  data () {
    return {
      show: false, // 右侧弹出层开关
      allCondition: {}, // 所有房屋查询条件

      result1: [], // 查询条件户型
      result2: [], // 查询条件朝向
      result3: [], // 查询条件楼层
      result4: [], // 查询条件房屋亮点
      area: null, // 查询条件 地区
      subway: null, // 查询条件 地铁
      rentType: null, // 查询条件 方式
      price: null, // 查询方式 价格
      start: 1, // 查询方式 开始位置
      end: 20, // 查询方式 结束位置

      houseList: [], // 获取到的房屋信息
      finished: false, // 判断是否全部加载
      loading: false, // 判断当前是否加载完成
      refreshing: false // 上拉刷新用
    }
  },
  methods: {
    // 点击完成事件和点击取消事件
    onConfirm1 () {
      this.$refs.item1.toggle()
    },
    onCancel1 () {
      this.$refs.item1.toggle()
    },
    onConfirm2 () {
      this.$refs.item2.toggle()
    },
    onCancel2 () {
      this.$refs.item2.toggle()
    },
    onConfirm3 () {
      this.$refs.item3.toggle()
    },
    onCancel3 () {
      this.$refs.item3.toggle()
    },
    onConfirm4 () {
      this.$refs.item4.toggle()
    },
    onCancel4 () {
      this.$refs.item4.toggle()
    },

    // 选项切换事件
    onChange () {
      console.log(111)
      const getValues = this.$refs.itemq1.getValues()
      // 判断是区域还是地铁
      if (getValues[0].value === 'area') {
        // 判断有没有第三项
        if (getValues[2].value === 'null' || getValues[2] === '') {
          this.area = getValues[1].value
        } else {
          this.area = getValues[2].value
        }
      } else {
        if (getValues[2].value === 'null' || getValues[2] === '') {
          console.log(getValues)
          this.subway = getValues[1].value
        } else {
          console.log(getValues)
          this.subway = getValues[2].value
        }
      }
    },

    // 发送ajax
    async getHouse () {
      try {
        const params = {
          cityId: this.$store.state.currentCity.value,
          start: this.start,
          end: this.end,
          renType: this.renType,
          price: this.price,
          more: `${this.result1.join(',') + ',' + this.result2.join(',') + ',' + this.result3.join(',') + ',' + this.result4.join(',')}`
        }
        if (this.loading) {
          console.log(1)
          const res = await getHouses(params)
          this.houseList = [...this.houseList, ...res.data.body.list]
        } else {
          console.log(2)
          this.start = 1
          this.end = 20
          const res = await getHouses(params)
          this.houseList = res.data.body.list
        }
      } catch (error) {
        // console.log(error)
      }
    },

    // 上拉加载更多
    async onLoad () {
      this.start += 20
      this.end += 20
      await this.getHouse()
      this.loading = false
    },

    // 下拉刷新
    async onRefresh () {
      this.start = 1
      this.end = 20
      await this.getHouse()
      this.refreshing = false
    }
  },
  computed: {
    // 下拉框数据
    columns1 () {
      const arr = []
      arr[0] = this.allCondition.area
      arr[1] = this.allCondition.subway
      return arr
    },
    columns2 () {
      let arr = []
      arr = this.allCondition.rentType ? this.allCondition.rentType : []
      arr.forEach(item => { item.children = undefined })
      return arr
    },
    columns3 () {
      let arr = []
      arr = this.allCondition.price ? this.allCondition.price : []
      arr.forEach(item => { item.children = undefined })
      console.log(arr)
      return arr
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// 搜索框
.top {
  height: 50px;
  width: 100%;
  background-color: #21b97a;
  position: relative;

  .search {
    position: absolute;
    top: 8px;
    width: 94%;
    height: 34px;
    margin: 0 3%;
    z-index: 1;
    font-size: 14px;
    line-height: 34px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    .van-icon-arrow-left {
      font-size: 20px;
      color: #fff;
      line-height: 34px;
      flex: 1;
    }
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
}
// 下拉框
.select {
  /deep/.van-dropdown-menu__bar {
    height: 40px !important;
  }
}
// 房屋信息
.house {
  padding: 0 15px;
  background-color: #fff;
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
}
.bottombox {
  bottom: 0px;
}
</style>
