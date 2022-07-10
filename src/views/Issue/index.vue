<template>
  <div>
    <van-nav-bar title="发布房源" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-cell title="房源信息"> </van-cell>
      <van-cell
        title="小区名称"
        is-link
        :value="communityName"
        @click="popupsShow.sousuoShow = true"
      />
      <van-field v-model="datas.rent" label="租 金" placeholder="请输入租金/月">
        <span slot="extra">￥/月</span>
      </van-field>
      <van-field
        v-model="datas.area"
        label="建筑面积"
        placeholder="请输入建筑面积"
      >
        <span slot="extra">m²</span>
      </van-field>
      <van-cell
        title="户型"
        is-link
        :value="datas2.type"
        @click="popupsShow.type = true"
      />
      <van-cell
        title="所在楼层"
        is-link
        :value="datas2.floor"
        @click="popupsShow.floor = true"
      />
      <van-cell
        title="朝向"
        is-link
        :value="datas2.oriedted"
        @click="popupsShow.oriedted = true"
      />
      <van-cell title="房屋标题" />
      <van-field
        v-model="datas.title"
        placeholder="请输入标题(例如:整租小区名 2室 5000元)"
      />
      <van-cell title="房屋图像" />
      <van-uploader v-model="fileList" multiple :after-read="afterRead" />
      <van-cell title="房屋配置" />
      <van-grid square>
        <van-grid-item
          v-for="(item, index) in supporting"
          :key="index"
          :text="item.label"
          :class="{ red: aa.some((v) => v == item.label) }"
          @click="onClick(item)"
        >
          <template #icon>
            <i class="toutiao" :class="`toutiao-${item.pinyin}`"></i>
          </template>
        </van-grid-item>
      </van-grid>
      <van-cell title="房屋描述" />
      <van-field v-model="datas.describe" placeholder="请输入房屋描述信息" />
    </van-cell-group>

    <van-tabbar class="btns">
      <van-button @click="cancel">取消</van-button>
      <van-button type="primary" @click="puthomes">提交</van-button>
    </van-tabbar>

    <!-- 弹出框 -->
    <van-popup
      v-model="popupsShow.sousuoShow"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <van-search
        v-model="search"
        placeholder="请输入搜索关键词"
        @keyup="getCommunity1"
      />
      <van-cell-group>
        <van-cell
          :value="item.communityName"
          v-for="(item, index) in plots"
          :key="index"
          @click="
            communityName = item.communityName;
            community = item.community;
            popupsShow.sousuoShow = false;
          "
        />
      </van-cell-group>
    </van-popup>
    <van-popup
      v-model="popupsShow.type"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        show-toolbar
        :columns="roomType"
        @confirm="onConfirm1"
        @cancel="onCancel1"
      />
    </van-popup>
    <van-popup
      v-model="popupsShow.floor"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        show-toolbar
        :columns="floor"
        @confirm="onConfirm2"
        @cancel="onCancel2"
    /></van-popup>
    <van-popup
      v-model="popupsShow.oriedted"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        show-toolbar
        :columns="oriented"
        @confirm="onConfirm3"
        @cancel="onCancel3"
    /></van-popup>
  </div>
</template>

<script>
import { getHouseParams, getCommunity, getImages, issueHouse } from '@/api/lookHouse'
// 拼音
const pinyin = require('js-pinyin')
pinyin.setOptions({ checkPolyphone: false, charCase: 0 })
export default {
  async created () {
    const res = await getHouseParams()
    this.houseParamsList = res.data.body
  },
  data () {
    return {
      communityName: '请输入小区名称', // 选中的名字
      community: '', // 选中的value
      plots: [], // 接受搜索到的数据
      search: '', // 搜索
      aa: [], // 房屋配置
      houseParamsList: { // 获取到的发布房屋需要的条件
        floor: [],
        oriented: [],
        roomType: [],
        supporting: []

      },
      popupsShow: {
        sousuoShow: false, // 搜索框弹出层
        type: false, // 房屋类型
        floor: false, // 楼层
        oriedted: false // 朝向
      },
      // 发送请求用
      datas: {
        // supporting: this.aa.join('|'), // 房屋配置
        describe: '', // 房屋描述
        title: '', // 房屋标题
        rent: '', // 租金roomtype
        area: '', // 面积
        type: '', // 房屋类型
        floor: '', // 楼层
        oriedted: '' // 朝向
      },
      // 渲染视图用
      datas2: {

        type: '', // 房屋类型
        floor: '', // 楼层
        oriedted: '' // 朝向
      },
      fileList: [], // 图片文件
      imgs: []

    }
  },
  methods: {
    onClick (item) {
      if (this.aa.some(v => v === item.label)) {
        const index = this.aa.indexOf(item.label)
        this.aa.splice(index, 1)
      } else {
        this.aa.push(item.label)
      }

      item.done = !item.done
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      const formdata = new FormData()
      formdata.append('file', file.file)
      const { data } = await getImages(formdata)
      console.log('上传图片')
      console.log(data.body)
      this.imgs.push(data.body[0])
    },
    // 点击取消时间
    cancel () { },
    // 点击确定提交事件
    async puthomes () {
      try {
        const data = {
          title: this.datas.title,
          description: this.datas.describe,
          houseImg: this.imgs.join('|'),
          oriented: this.datas.oriented,
          supporting: this.aa.join('|'),
          price: this.datas.rent,
          roomType: this.datas.type,
          size: this.datas.area,
          floor: this.datas.floor,
          community: this.community
        }
        issueHouse(data)
      } catch (error) {
        console.log(error)
      }
    },
    // 所有picker选择器的取消确认事件
    onConfirm1 (value, index) {
      this.popupsShow.type = false
      this.datas.type = this.houseParamsList.roomType[index].value
      this.datas2.type = this.houseParamsList.roomType[index].label
    },
    onCancel1 () {
      this.popupsShow.type = false
    },
    onConfirm2 (value, index) {
      this.popupsShow.floor = false
      this.datas.floor = this.houseParamsList.floor[index].value
      this.datas2.floor = this.houseParamsList.floor[index].label
    },
    onCancel2 () {
      this.popupsShow.floor = false
    },
    onConfirm3 (value, index) {
      this.popupsShow.oriedted = false
      this.datas.oriedted = this.houseParamsList.oriented[index].value
      this.datas2.oriedted = this.houseParamsList.oriented[index].label
    },
    onCancel3 () {
      this.popupsShow.oriedted = false
    },
    // 小区关键词查询
    async getCommunity1 () {
      try {
        const res = await getCommunity({ name: this.search, id: this.$store.state.currentCity.value })
        this.plots = res.data.body
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    // 楼层
    floor () {
      return this.houseParamsList.floor.map(item => item.label)
    },
    // 朝向
    oriented () {
      return this.houseParamsList.oriented.map(item => item.label)
    },
    // 户型
    roomType () {
      return this.houseParamsList.roomType.map(item => item.label)
    },
    // 房屋配置
    supporting: {
      get () {
        this.houseParamsList.supporting.forEach(item => {
          item.pinyin = pinyin.getFullChars(item.label).toLowerCase()
          item.done = false
        })
        return this.houseParamsList.supporting
      },
      set (newvalue) {
        console.log(newvalue)
      }
    }

  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.btns {
  margin-top: 50px;
  /deep/ .van-button {
    width: 50%;
    border: none;
  }
}
/deep/.red {
  color: red !important;
}
/deep/.van-grid-item__text {
  color: unset;
}
</style>
