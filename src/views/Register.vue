<template>
  <div>
    <van-nav-bar
      title="注册"
      left-text="返回"
      right-text="已有账号?在这登录"
      left-arrow
      @click-left="goBack"
      @click-right="goLogin"
    />
    <van-image
      width="100vw"
      height="40vh"
      fit="contain"
      :src="require(`/src/assets/Lunch break_Flatline.png`)"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="中文、大小写字母、和数字4-12 个字符"
        :rules="[
          { required: true, message: '中文、大小写字母、和数字4-12 个字符' },
        ]"
        @input="testUserName"
      />
      <van-field
        v-model="uname"
        name="账号"
        label="账号"
        placeholder="4到16位（字母，数字，下划线，减号）"
        :rules="[
          { required: true, message: '4到16位（字母，数字，下划线，减号）' },
        ]"
        @input="testUname"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="8-16个字符，必须包含数字、大写字母、小写字母中的2种字符"
        :rules="[
          {
            required: true,
            message: '8-16个字符，必须包含数字、大写字母、小写字母中的2种字符',
          },
        ]"
      />
      <van-field
        v-model="password2"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '两次密码不一致' }]"
      />
      <van-field
        v-model="email"
        name="邮箱"
        label="邮箱"
        placeholder="您的邮箱"
        :rules="[{ required: true, message: '邮箱格式错误' }]"
      />
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="您的手机号"
        :rules="[{ required: true, message: '手机号格式错误' }]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          plain
          color="#ffc107"
          native-type="submit"
          >注册</van-button
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
    onSubmit(values) {
      console.log("submit", values);
      if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{4,12}$/.test(this.username)) {
        Dialog.alert({
          title: "提示",
          message: "用户名格式错误",
        }).then(() => {
          // on close
        });
        return;
      }
      if (!/^[a-zA-Z0-9_-]{4,16}$/.test(this.uname)) {
        Dialog.alert({
          title: "提示",
          message: "账号格式错误",
        }).then(() => {
          // on close
        });
        return;
      }
      if (
        !/(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[a-z])(?=.*[A-Z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[0-9])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[0-9])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[a-z])(?=[0-9]))|((?=.*[A-Z])(?=.*[0-9])(?=[a-z]))|((?=.*[a-z])(?=.*[A-Z])(?=[0-9]))|((?=.*[a-z])(?=.*[0-9])(?=[A-Z]))|((?=.*[0-9])(?=.*[A-Z])(?=[a-z]))|((?=.*[0-9])(?=.*[a-z])(?=[A-Z])))^[a-zA-Z0-9]{8,16}$/gm.test(
          this.password
        )
      ) {
        Dialog.alert({
          title: "提示",
          message: "密码格式错误",
        }).then(() => {
          // on close
        });
        return;
      }
      if (this.password != this.password2) {
        Dialog.alert({
          title: "提示",
          message: "两次密码不一致",
        }).then(() => {
          // on close
        });
        return;
      }
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.email
        )
      ) {
        Dialog.alert({
          title: "提示",
          message: "邮箱格式错误",
        }).then(() => {
          // on close
        });
        return;
      }
      if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(this.phone)) {
        Dialog.alert({
          title: "提示",
          message: "手机号格式错误",
        }).then(() => {
          // on close
        });
        return;
      }
      let url = "http://127.0.0.1:3030/v2/pro/register";
      let data = `uname=${this.uname}&upwd=${this.password}&upwd2=${this.password2}&uemail=${this.email}&uphone=${this.phone}&user_name=${this.username}`;
      this.axios.post(url, data).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          Dialog.alert({
            title: "提示",
            message: "恭喜您注册成功,正在为你跳转到登录页面",
          }).then(() => {
            sessionStorage.setItem("RegUname", this.uname);
            this.$router.push("/login");
          });
        } else {
          Dialog.alert({
            title: "提示",
            message: "注册失败,请检查用户名或账号是否重复",
          }).then(() => {});
        }
      });
    },
    goLogin() {
      this.$router.push("/login");
    },
    testUname() {
      const url = `http://127.0.0.1:3030/v2/pro/check_uname?uname=${this.uname}`;
      if (this.lock == false) {
        return;
      }
      this.axios.get(url).then((res) => {
        console.log(res);
        if (res.data.code == 201) {
          Dialog.alert({
            title: "提示",
            message: "账号重复,请修改",
          }).then(() => {});
        }
      });
      this.lock = false;
      setTimeout(() => {
        this.lock = true;
      }, 1000);
    },
    testUserName() {
      const url = `http://127.0.0.1:3030/v2/pro/check_user_name?user_name=${this.username}`;
      if (this.lock2 == false) {
        return;
      }
      this.axios.get(url).then((res) => {
        console.log(res);
        if (res.data.code == 201) {
          Dialog.alert({
            title: "提示",
            message: "用户名重复,请修改",
          }).then(() => {});
        }
      });
      this.lock2 = false;
      setTimeout(() => {
        this.lock2 = true;
      }, 1000);
    },
  },
  data() {
    return {
      username: "",
      uname: "",
      password: "",
      password2: "",
      email: "",
      phone: "",
      lock: true,
      lock2: true,
    };
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
