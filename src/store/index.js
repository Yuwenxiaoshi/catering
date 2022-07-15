import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: "",
    active: 'Index',
    imgUrl: "http://127.0.0.1:3030/img"
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
    },
    goIndex(state) {
      state.active = 'Index'
    },
    goShopping(state) {
      state.active = "Shopping"
    },
    goSearch(state) {
      state.active = "Search"
    },
  },
  actions: {
  },
  modules: {
  }
})
