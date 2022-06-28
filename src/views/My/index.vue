<template>
  <div>
    <div class="top">
      <!-- 已登录 -->
      <div class="login" v-if="$store.state.token">
        <img src="@/assets/img/avatar.png" alt="" />
        <div class="message">
          <div class="img">
            <img src="@/assets/img/touxiang.png" alt="" />
          </div>
          <div class="bottom">
            <div class="name">
              <span>{{ userInfo.nickname }}</span>
            </div>
            <div class="logout">
              <span @click="logout">退出</span>
            </div>
            <div class="compile"><span>编辑个人资料</span><i></i></div>
          </div>
        </div>
      </div>

      <!-- 未登录 -->
      <div class="notlogin clearfix" v-else>
        <img src="@/assets/img/bg.png" alt="" />
        <div class="message">
          <div class="img">
            <img src="@/assets/img/touxiang.png" alt="" />
          </div>
          <div class="bottom">
            <div class="name">
              <span>游客</span>
            </div>
            <div class="logout">
              <span class="golog" @click="$router.push('/login')">去登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 宫格 -->
    <div class="center">
      <van-grid :column-num="3" :border="false">
        <van-grid-item icon="photo-o" text="我的收藏" />
        <van-grid-item icon="photo-o" text="我的出租" />
        <van-grid-item icon="photo-o" text="看房记录" />
        <van-grid-item icon="photo-o" text="成为房主" />
        <van-grid-item icon="photo-o" text="个人资料" />
        <van-grid-item icon="photo-o" text="联系我们" />
      </van-grid>
    </div>

    <!-- bottom -->
    <div class="bottom">
      <img src="@/assets/img/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  async created () {
    try {
      const res = await getUserInfo()
      this.userInfo = res.data.body
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确认要退出吗' })
        this.$store.state.token = ''
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// 顶部
.top {
  width: 100%;
  position: relative;
  max-height: 375px;
  min-height: 300px;
  .message {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 318px;
    height: 55%;
    background-color: #fff;
    box-shadow: 0 0 10px 3px #ddd;
    .img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 5px solid #f5f5f5;
      background-color: #fff;
      box-shadow: 0 2px 2px #bdbdbd;
      img {
        width: 100%;
      }
    }
    .bottom {
      padding-top: 50px;
      text-align: center;
      font-size: 13px;
      .logout {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 25px;
        span {
          display: block;
          width: 54px;
          height: 20px;
          font-size: 12px;
          background-color: #21b97a;
          color: #fff;
          border-radius: 10px;
        }
        .golog {
          font-size: 13px;
          line-height: 30px;
          width: 70px;
          height: 30px;
          border-radius: 8px;
        }
      }
      .compile {
        color: #999;
        font-size: 12px;
      }
    }
  }
}

// 中间
.center {
  margin-bottom: 10px;

  /deep/.van-grid-item {
    width: 125px;
    height: 95px;
    padding: 15px 0;
    span {
      color: #333;
    }
  }
}

// 底部
.bottom {
  text-align: center;
  img {
    width: 92%;
  }
}
</style>
