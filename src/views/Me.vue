<template>
  <div>
    <van-row v-if="username">
      <van-col span="8">
        <van-image
          round
          width="33vw"
          height="33vw"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
      /></van-col>
      <van-col span="16" v-if="username">
        <van-cell-group inset>
          <van-cell title="用户名" value="内容" />
          <van-cell title="邮箱" value="内容" />
          <van-cell title="电话" value="内容" /> </van-cell-group
      ></van-col>
    </van-row>
    <van-cell-group inset v-if="username">
      <van-cell title="修改信息" value=">" @click="bj" />
      <van-cell title="我的订单" value=">" />
      <van-cell title="我的收藏" value=">" />
      <van-cell title="历史足迹" value=">" />
      <van-cell title="设置" value=">" />
    </van-cell-group>
    <van-button
      type="danger"
      block
      style="margin-top: 1vh"
      @click="quit"
      v-if="username"
      >退出当前账号</van-button
    >
    <div v-else>
      <div style="height: 4vh"></div>
      <van-image
        width="100vw"
        height="40vh"
        fit="contain"
        :src="require(`/src/assets/Notifications_Isometric.png`)"
      />
      <div style="text-align: center; color: red" @click="goLogin">
        请先登录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    bj() {
      alert("下班");
    },
    quit() {
      this.username = "";
      this.$store.commit("quitUsername");
    },
    goLogin() {
      this.$router.push("/login");
    },
  },
  mounted() {
    this.$store.commit("getUsername");
    this.username = this.$store.state.username || "";
  },
};
</script>

<style lang="scss" scoped></style>
