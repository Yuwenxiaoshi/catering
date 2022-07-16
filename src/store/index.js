import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: "",
    active: 'Index',
    imgUrl: "http://127.0.0.1:3030/img",
    userInfo: {},
  },
  getters: {
  },
  mutations: {
    getUsername(state) {
      state.username = window.sessionStorage.getItem('username')
    },
    quitUsername(state) {
      window.sessionStorage.removeItem("username");
      state.username = window.sessionStorage.getItem('username')
    },
    goMe(state) {
      state.active = 'Me'
      sessionStorage.setItem('active', "Me")
    },
    goIndex(state) {
      state.active = 'Index'
      sessionStorage.setItem('active', 'Index')
    },
    goShopping(state) {
      state.active = "Shopping"
      sessionStorage.setItem('active', "Shopping")
    },
    goSearch(state) {
      state.active = "Search"
      sessionStorage.setItem('active', "Search")
    },
  },
  actions: {
  },
  modules: {
  }
})
