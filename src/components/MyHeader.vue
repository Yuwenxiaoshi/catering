<template>
  <div>
    <van-nav-bar title="欢迎来到餐饮" fixed>
      <template #left>
        <a @click="goIndex">
          <img
            src="http://127.0.0.1:3030/img/logo.png"
            width="100%"
            style="margin-left: -2.5rem"
            alt=""
          />
        </a>
      </template>

      <template #right v-if="username">
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
    this.username = window.sessionStorage.getItem("username") || "";
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    goMe() {
      this.$router.push("/me");
      window.sessionStorage.setItem("active", "Me");
      location.reload();
    },
    goIndex() {
      this.$router.push("/index");
      window.sessionStorage.setItem("active", "Index");
      location.reload();
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
