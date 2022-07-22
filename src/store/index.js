import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uname: "",
    active: 'Index',
  },
  getters: {
  },
  mutations: {
    getUname(state) {
      state.uname = window.sessionStorage.getItem('uname')
    },
    quitUname(state) {
      window.sessionStorage.removeItem("uname");
      state.uname = window.sessionStorage.getItem('uname')
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
