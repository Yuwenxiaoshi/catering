<template>
  <div>
    <van-nav-bar
      title="登录"
      left-text="返回"
      right-text="没有账号?在这注册"
      left-arrow
      @click-left="goBack"
      @click-right="goRegister"
    />
    <van-image
      width="100vw"
      height="40vh"
      fit="contain"
      :src="require(`/src/assets/Lunch Break_Two Color.png`)"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="uname"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          plain
          color="#ffc107"
          native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  methods: {
    goBack() {
      this.$router.push(`/${this.$store.state.active.toLocaleLowerCase()}`);
    },
    onSubmit() {
      let url = "http://127.0.0.1:3030/v2/pro/login";
      let data = `uname=${this.uname}&upwd=${this.password}`;
      this.axios.post(url, data).then((res) => {
        if (res.data.code == 404) {
          Dialog.alert({
            title: "提示",
            message: "登陆失败,请检查用户名或密码",
          }).then(() => {});
        } else if (res.data.code == 200) {
          Dialog.alert({
            title: "提示",
            message: "登录成功,正在为你跳转主页",
          }).then(() => {
            window.sessionStorage.setItem("uname", this.uname);
            this.$store.commit("getUname");
            this.$store.commit("goIndex");
            this.$router.push("/index");
            setTimeout(() => {
              location.reload();
            }, 50);
          });
        }
      });
    },
    goRegister() {
      this.$router.push("/register");
    },
  },
  data() {
    return {
      uname: "",
      password: "",
    };
  },
  mounted() {
    this.uname = sessionStorage.getItem("RegUname") || "";
  },
};
</script>

<style lang="scss">
.van-nav-bar__text {
  color: black !important;
}
.van-icon-arrow-left:before {
  color: #ffc107 !important;
}
</style>
