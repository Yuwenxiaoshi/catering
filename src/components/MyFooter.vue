<template>
  <div>
    <div style="height: 50px"></div>
    <van-tabbar v-model="active" active-color="#ffc107">
      <van-tabbar-item name="Index" icon="home-o" @click="goIndex"
        >主页</van-tabbar-item
      >
      <van-tabbar-item name="Search" icon="search" @click="goSearch"
        >搜索</van-tabbar-item
      >
      <van-tabbar-item name="Shopping" icon="logistics" @click="goShopping"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item name="Me" icon="contact" @click="goMe"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "Index",
    };
  },
  mounted() {
    this.active = window.sessionStorage.getItem("active");
  },
  methods: {
    goIndex() {
      this.$router.push("/index");
      window.sessionStorage.setItem("active", "Index");
    },
    goSearch() {
      this.$router.push("/search");
      window.sessionStorage.setItem("active", "Search");
    },
    goShopping() {
      this.$router.push("/shopping");
      window.sessionStorage.setItem("active", "Shopping");
    },
    goMe() {
      this.$router.push("/me");
      window.sessionStorage.setItem("active", "Me");
    },
  },
  beforeCreate() {},
};
</script>

<style lang="scss" scoped>
.van-tabbar-item--active {
  pointer-events: none;
}
</style>
