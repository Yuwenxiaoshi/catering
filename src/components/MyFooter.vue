<template>
  <div>
    <div style="height: 50px"></div>
    <van-tabbar v-model="active" active-color="#ffc107">
      <van-tabbar-item @click="goIndex">
        <span>主页</span>
        <template #icon="">
          <img
            :src="require(`/src/assets/index${active == 0 ? '1' : '0'}.svg`)"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item @click="goSearch">
        <span>搜索</span>
        <template #icon="">
          <img
            :src="require(`/src/assets/search${active == 1 ? '1' : '0'}.svg`)"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item @click="goShopping">
        <span>购物车</span>
        <template #icon="">
          <img
            :src="require(`/src/assets/shopping${active == 2 ? '1' : '0'}.svg`)"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item @click="goMe">
        <span>我的</span>
        <template #icon="">
          <img :src="require(`/src/assets/me${active == 3 ? '1' : '0'}.svg`)" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    this.active = this.$store.state.active;
    console.log(this.active);
  },
  methods: {
    goIndex() {
      this.$router.push("/index");
      this.$store.commit("goIndex");
      this.active = 0;
    },
    goSearch() {
      this.$router.push("/search");
      this.$store.commit("goSearch");
      this.active = 1;
    },
    goShopping() {
      this.$router.push("/shopping");
      this.$store.commit("goShopping");
      this.active = 2;
    },
    goMe() {
      this.$router.push("/me");
      this.$store.commit("goMe");
      this.active = 3;
    },
    setActive() {
      console.log("setActive调用");
      console.log(this.$route.name);
      if (this.$route.name == "Index") {
        this.active = 0;
        console.log("1");
      } else if (this.$route.name == "Search") {
        this.active = 1;
        console.log("2");
      } else if (this.$route.name == "Shopping") {
        this.active = 2;
        console.log("3");
      } else if (this.$route.name == "Me") {
        this.active = 3;
        console.log("4");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.van-tabbar-item--active {
  pointer-events: none;
}
</style>
