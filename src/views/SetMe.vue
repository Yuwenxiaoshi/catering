<template>
  <div>
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="goBack"
      title="修改信息"
    />
    <van-row>
      <van-col span="12">
        <van-uploader>
          <van-image
            width="50vw"
            height="50vw"
            round
            :src="userInfo.avatar"
            :after-read="afterRead"
          />
        </van-uploader>
      </van-col>
      <van-col
        span="12"
        style="height: 50vw; line-height: 50vw; text-align: center"
      >
        点击头像修改图片
      </van-col>
    </van-row>
    <van-cell-group inset>
      <van-cell
        title="用户名"
        :value="userInfo.user_name"
        @click="setUnameShow"
      />
      <van-cell title="账号" :value="userInfo.uname" />
      <van-cell title="密码" value=">" @click="setPwdShow" />
      <van-cell
        title="性别"
        :value="userInfo.gender == 1 ? '男' : '女'"
        @click="setSexShow"
      />
      <van-cell title="电话" :value="userInfo.phone" @click="setPhoneShow" />
      <van-cell title="邮箱" :value="userInfo.email" @click="setEmailShow" />
    </van-cell-group>
    <van-action-sheet v-model="usernameshow" title="修改用户名">
      <van-field
        v-model="username"
        type="text"
        label="用户名"
        placeholder="请输入用户名"
        @input="testUserName"
      />
      <van-button
        round
        block
        type="info"
        native-type="submit"
        @click="setUserName"
        >提交</van-button
      >
    </van-action-sheet>
    <van-action-sheet v-model="pwdshow" title="修改密码">
      <van-field
        v-model="pwd1"
        type="password"
        label="原密码"
        placeholder="请输入原密码"
      />
      <van-field
        v-model="pwd2"
        type="password"
        label="密码"
        placeholder="请输入要修改的密码"
      />
      <van-field
        v-model="pwd3"
        type="password"
        label="验证密码"
        placeholder="两次密码保持一致"
      />
      <van-button round block type="info" native-type="submit">提交</van-button>
    </van-action-sheet>
    <van-action-sheet v-model="sexshow" title="修改性别">
      <van-radio-group v-model="radio">
        <van-radio name="0" style="margin-bottom: 3px">女</van-radio>
        <van-radio name="1" style="margin-bottom: 3px">男</van-radio>
      </van-radio-group>
      <van-button round block type="info" native-type="submit">提交</van-button>
    </van-action-sheet>
    <van-action-sheet v-model="phoneshow" title="修改手机号">
      <van-field
        v-model="phone"
        type="tel"
        label="邮箱"
        placeholder="请输入手机号"
      />
      <van-button round block type="info" native-type="submit">提交</van-button>
    </van-action-sheet>
    <van-action-sheet v-model="emailshow" title="修改邮箱">
      <van-field
        v-model="email"
        type="text"
        label="邮箱"
        placeholder="请输入邮箱"
      />
      <van-button round block type="info" native-type="submit">提交</van-button>
    </van-action-sheet>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      uname: "",
      userInfo: {},
      content: "",
      usernameshow: false,
      username: "",
      sexshow: false,
      sex: "",
      radio: "0",
      phoneshow: false,
      phone: null,
      emailshow: false,
      email: "",
      pwdshow: false,
      pwd1: null,
      pwd2: null,
      pwd3: null,
      uid: null,
      lock2: true,
    };
  },
  methods: {
    getMe() {
      let url = "http://127.0.0.1:3030/v2/pro/me";
      let data = `uname=${this.uname}`;
      this.axios.post(url, data).then((res) => {
        this.userInfo = res.data.data[0];
        this.uid = res.data.data[0].uid;
      });
    },
    goBack() {
      window.history.back(-1);
    },
    afterRead(file) {
      let url = "http://127.0.0.1:3030/v2/pro/upload";
      let data = new FormData();
      data.append("uploadFile", file.file);
      this.axios.post(url, data).then((res) => {
        // this.content = res.data
        console.log(res);
      });
    },
    setUnameShow() {
      this.usernameshow = !this.usernameshow;
    },
    setSexShow() {
      this.sexshow = !this.sexshow;
    },
    setPhoneShow() {
      this.phoneshow = !this.phoneshow;
    },
    setEmailShow() {
      this.emailshow = !this.emailshow;
    },
    setPwdShow() {
      this.pwdshow = !this.pwdshow;
    },
    setUserName() {
      if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{4,12}$/.test(this.username)) {
        Dialog.alert({
          title: "提示",
          message: "用户名格式错误(中文、大小写字母、和数字4-12 个字符)",
        }).then(() => {
          // on close
        });
        return;
      } else {
        let url = "http://127.0.0.1:3030/v2/pro/setusername";
        let data = `username=${this.username}&uid=${this.uid}`;
        this.axios.put(url, data).then((res) => {
          if (res.data.code == 200) {
            Dialog.alert({
              title: "提示",
              message: "用户名修改成功",
            }).then(() => {
              location.reload();
            });
          } else {
            Dialog.alert({
              title: "提示",
              message: "用户名修改失败",
            }).then(() => {});
          }
        });
      }
    },
    testUserName() {
      const url = `http://127.0.0.1:3030/v2/pro/check_user_name?user_name=${this.username}`;
      if (this.lock2 == false) {
        return;
      }
      this.axios.get(url).then((res) => {
        if (res.data.code == 201) {
          Dialog.alert({
            title: "提示",
            message: "用户名重复,请修改",
          }).then(() => {
            this.username = "";
          });
        }
      });
      this.lock2 = false;
      setTimeout(() => {
        this.lock2 = true;
      }, 1000);
    },
  },
  mounted() {
    this.uname = sessionStorage.getItem("uname") || "";
    this.getMe();
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
.van-button--info,
.van-radio__icon--checked .van-icon {
  background-color: #ffc107;
  border-color: #ffc107;
}
</style>
