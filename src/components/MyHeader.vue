<template>
  <div>
    <van-nav-bar title="欢迎来到餐饮" fixed>
      <template #left>
        <a @click="goIndex">
          <img
            :src="require(`/src/assets/logo.png`)"
            width="100%"
            style="margin-left: -2.5rem"
            alt=""
          />
        </a>
      </template>

      <template #right v-if="uname">
        <van-image
          round
          width="2.5rem"
          height="2.5rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
          @click="goMe"
        />
      </template>
      <template #right v-else>
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </template>
    </van-nav-bar>
    <div style="height: 46px"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.uname = sessionStorage.getItem("uname") || "";
  },
  data() {
    return {
      uname: "",
    };
  },
  methods: {
    goMe() {
      if (this.$route.name == "Me") {
        return;
      } else {
        this.$store.commit("goME");
        sessionStorage.setItem("active", "Me");
        this.$router.push("/me");
        setTimeout(() => {
          location.reload();
        }, 50);
      }
    },
    goIndex() {
      if (this.$route.name == "Index") {
        return;
      } else {
        this.$store.commit("goIndex");
        sessionStorage.setItem("active", "Index");
        this.$router.push("/index");
        setTimeout(() => {
          location.reload();
        }, 50);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  margin: 5px;
  color: black;
}
a:active {
  color: #ffc107; /*鼠标点击时的颜色*/
}
</style>
