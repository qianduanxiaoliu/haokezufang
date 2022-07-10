import Vue from 'vue'
import Vuex from 'vuex'
// 自动保存在本地
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    currentCity: { // 当前城市
      label: '广州',
      pinyin: 'guangzhou',
      short: 'gz',
      value: 'AREA|e4940177-c04c-383d'
    }
  },
  getters: {
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setCurrentCity (state, payload) {
      state.currentCity = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
