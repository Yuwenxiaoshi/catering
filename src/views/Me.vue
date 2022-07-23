<template>
  <div>
    <van-row v-if="uname">
      <van-col span="8">
        <van-image round width="33vw" height="33vw" :src="userInfo.avatar"
      /></van-col>
      <van-col span="16" v-if="uname">
        <van-cell-group inset>
          <van-cell title="用户名" :value="userInfo.user_name" />
          <van-cell title="性别" :value="userInfo.gender == 1 ? '男' : '女'" />
          <van-cell title="电话" :value="userInfo.phone" /> </van-cell-group
      ></van-col>
    </van-row>
    <van-cell-group inset v-if="uname">
      <van-cell title="修改信息" value=">" @click="bj" />
      <van-cell title="我的订单" value=">" />
      <van-cell title="我的收藏" value=">" />
      <van-cell title="收货地址" value=">" @click="goSh" />
      <van-cell title="历史足迹" value=">" />
      <van-cell title="设置" value=">" />
    </van-cell-group>
    <van-button
      type="danger"
      block
      style="margin-top: 1vh"
      @click="quit"
      v-if="uname"
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
      uname: "",
      userInfo: {},
    };
  },
  methods: {
    bj() {
      alert("下班");
    },
    quit() {
      this.$store.commit("quitUname");
      location.reload();
    },
    goLogin() {
      this.$router.push("/login");
    },
    getMe() {
      let url = "http://127.0.0.1:3030/v2/pro/me";
      let data = `uname=${this.uname}`;
      this.axios.post(url, data).then((res) => {
        this.userInfo = res.data.data[0];
      });
    },
    goSh() {
      this.$router.push("/receiving");
    },
  },
  mounted() {
    this.$store.commit("getUname");
    this.uname = this.$store.state.uname || "";
    if (this.uname) {
      this.getMe();
    }
  },
};
</script>

<style lang="scss" scoped></style>
