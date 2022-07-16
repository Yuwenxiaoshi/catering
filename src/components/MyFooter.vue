<template>
  <div>
    <div style="height: 50px"></div>
    <van-tabbar v-model="active" active-color="#ffc107">
      <van-tabbar-item @click="goIndex" name="Index">
        <span>主页</span>
        <template #icon="">
          <img
            :src="
              require(`/src/assets/index${active == 'Index' ? '1' : '0'}.svg`)
            "
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item @click="goSearch" name="Search">
        <span>搜索</span>
        <template #icon="">
          <img
            :src="
              require(`/src/assets/search${active == 'Search' ? '1' : '0'}.svg`)
            "
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item @click="goShopping" name="Shopping">
        <span>购物车</span>
        <template #icon="">
          <img
            :src="
              require(`/src/assets/shopping${
                active == 'Shopping' ? '1' : '0'
              }.svg`)
            "
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item @click="goMe" name="Me">
        <span>我的</span>
        <template #icon="">
          <img
            :src="require(`/src/assets/me${active == 'Me' ? '1' : '0'}.svg`)"
          />
        </template>
      </van-tabbar-item>
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
    this.active = sessionStorage.getItem("active") || 'Index';
  },
  methods: {
    goIndex() {
      this.$router.push("/index");
      this.$store.commit("goIndex");
      this.active = "Index";
    },
    goSearch() {
      this.$router.push("/search");
      this.$store.commit("goSearch");
      this.active = "Search";
    },
    goShopping() {
      this.$router.push("/shopping");
      this.$store.commit("goShopping");
      this.active = "Shopping";
    },
    goMe() {
      this.$router.push("/me");
      this.$store.commit("goMe");
      this.active = "Me";
    },
  },
};
</script>

<style lang="scss" scoped>
.van-tabbar-item--active {
  pointer-events: none;
}
</style>
