<template>
  <div>
    <van-nav-bar
      @click-left="onClickLeft"
      title="账号登录"
      left-text="返回"
      left-arrow
    />
    <!-- form表单 -->
    <div class="form">
      <van-form @submit="onSubmit" ref="form">
        <van-field
          v-model="username"
          name="username"
          placeholder="请输入账号"
          :rules="[{ required: true }, { pattern: /^[a-zA-Z0-9_-]{5,8}$/ }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          placeholder="请输入密码"
          :rules="[{ required: true }]"
        />
        <div class="button">
          <van-button block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
    <!-- 去注册 -->
    <div class="login">
      <router-link to="/">还没有账号,去注册~</router-link>
    </div>
  </div>
</template>

<script>
import { ToLogin } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      username: 'lxg12345',
      password: 'lxg12345'
    }
  },
  methods: {
    async onSubmit (values) {
      console.log(111)
      try {
        await this.$refs.form.validate('username')
        try {
          const res = await ToLogin(values)
          this.$store.commit('setToken', res.data.body.token)
          this.$toast.success('登录成功')
          setTimeout(() => {
            this.$router.push({ path: '/my' })
          }, 1000)
        } catch (error) {
          console.log(error)
          this.$toast.fail('账号密码不匹配')
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('用户名格式5-8位的字母和数组')
      }
    },
    // 点击返回事件
    onClickLeft () {
      this.$router.push({
        path: '/my'
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
.van-nav-bar {
  margin-bottom: 20px;
}
/deep/.form {
  height: 206px;
  padding: 0 15px;
  .van-cell {
    padding: 0 0;
    height: 60px;
    margin-bottom: 10px;
    .van-field__body {
      height: 60px;
      input {
        font-size: 17px;
      }
    }
    /deep/ &:after {
      width: 100%;
      left: 0 !important;
      right: 0 !important;
    }
  }
  .button {
    margin-top: 27px;
    height: 50px;
    .van-button--block {
      height: 50px;
      font-size: 18px;
      background-color: #21b97a;
      border: #21b97a 1px solid;
      &:before {
        background-color: #21b97a;
      }
    }
  }
}
.login {
  margin-top: 30px;
  text-align: center;
  a {
    font-size: 14px !important;
    color: #666;
  }
}
</style>
