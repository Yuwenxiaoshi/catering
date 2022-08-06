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
        <van-image width="50vw" height="50vw" round :src="userInfo.avatar" />
      </van-col>
      <van-col
        span="12"
        style="height: 50vw; line-height: 50vw; text-align: center"
        ><van-uploader :after-read="afterRead" />
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
        @blur="testPwd1"
      />
      <van-field
        v-model="pwd2"
        type="password"
        label="密码"
        placeholder="请输入要修改的密码"
        @blur="testPwd2"
      />
      <van-field
        v-model="pwd3"
        type="password"
        label="验证密码"
        placeholder="两次密码保持一致"
        @blur="testPwd3"
      />
      <van-button
        round
        block
        type="info"
        native-type="submit"
        :disabled="pwdbtn ? true : false"
        @click="setPwd"
        >提交</van-button
      >
    </van-action-sheet>
    <van-action-sheet v-model="sexshow" title="修改性别">
      <van-radio-group v-model="radio">
        <van-radio name="0" style="margin-bottom: 3px">女</van-radio>
        <van-radio name="1" style="margin-bottom: 3px">男</van-radio>
      </van-radio-group>
      <van-button round block type="info" native-type="submit" @click="setSex"
        >提交</van-button
      >
    </van-action-sheet>
    <van-action-sheet v-model="phoneshow" title="修改手机号">
      <van-field
        v-model="phone1"
        type="tel"
        label="原手机号"
        placeholder="请输入原手机号"
        @blur="testPhone"
      />
      <van-field
        v-model="phone2"
        type="tel"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-button
        round
        block
        type="info"
        native-type="submit"
        :disabled="phonebtn"
        @click="setPhone"
        >提交</van-button
      >
    </van-action-sheet>
    <van-action-sheet v-model="emailshow" title="修改邮箱">
      <van-field
        v-model="email1"
        type="text"
        label="原邮箱"
        placeholder="请输入原邮箱"
        @blur="testEmail"
      />
      <van-field
        v-model="email2"
        type="text"
        label="邮箱"
        placeholder="请输入邮箱"
      />
      <van-button
        round
        block
        type="info"
        native-type="submit"
        :disabled="emailbtn"
        @click="setEmail"
        >提交</van-button
      >
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
      radio: 0,
      phoneshow: false,
      phone1: null,
      phone2: null,
      emailshow: false,
      email1: "",
      email2: "",
      pwdshow: false,
      pwd1: "",
      pwd2: null,
      pwd3: null,
      uid: null,
      lock2: true,
      pwdbtn: true,
      phonebtn: true,
      emailbtn: true,
    };
  },
  methods: {
    getMe() {
      let url = "http://127.0.0.1:3030/v2/pro/me";
      let data = `uname=${this.uname}`;
      this.axios.post(url, data).then((res) => {
        this.userInfo = res.data.data[0];
        this.uid = res.data.data[0].uid;
        this.radio = res.data.data[0].gender + "";
        this.userInfo.phone = this.userInfo.phone.replace(
          /(\d{3})\d{4}(\d{4})/,
          "$1****$2"
        );
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
        this.userInfo.avatar = res.data.urls[0];
        let info = `avatar=${res.data.urls[0]}&uid=${this.uid}`;
        this.axios
          .put("http://127.0.0.1:3030/v2/pro/setavatar", info)
          .then((res) => {
            if (res.data.code == 200) {
              Dialog.alert({
                title: "提示",
                message: "头像修改成功",
              }).then(() => {});
            }
          });
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
              this.userInfo.user_name = this.username;
              this.usernameshow = false;
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
    testPwd1() {
      if (!this.pwd1) {
        return;
      }
      const url = `http://127.0.0.1:3030/v2/pro/testpwd?upwd=${this.pwd1}`;
      this.axios.get(url).then((res) => {
        if (res.data.code == 200) {
          this.pwdbtn = false;
        } else {
          Dialog.alert({
            title: "提示",
            message: "原密码错误,请检查",
          }).then(() => {
            this.pwdbtn = true;
          });
        }
      });
    },
    testPwd2() {
      if (!this.pwd2) {
        return;
      }
      if (
        !/(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[a-z])(?=.*[A-Z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[0-9])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[0-9])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[a-z])(?=[0-9]))|((?=.*[A-Z])(?=.*[0-9])(?=[a-z]))|((?=.*[a-z])(?=.*[A-Z])(?=[0-9]))|((?=.*[a-z])(?=.*[0-9])(?=[A-Z]))|((?=.*[0-9])(?=.*[A-Z])(?=[a-z]))|((?=.*[0-9])(?=.*[a-z])(?=[A-Z])))^[a-zA-Z0-9]{8,16}$/gm.test(
          this.pwd2
        )
      ) {
        Dialog.alert({
          title: "提示",
          message:
            "密码格式错误(8-16个字符，必须包含数字、大写字母、小写字母中的2种字符)",
        }).then(() => {
          this.pwdbtn = true;
        });
      } else {
        this.pwdbtn = false;
      }
    },
    testPwd3() {
      if (!this.pwd3) {
        return;
      }
      if (this.Pwd3 != this.Pwd1 && this.Pwd3) {
        Dialog.alert({
          title: "提示",
          message: "两次密码不一致",
        }).then(() => {
          this.pwdbtn = true;
        });
      } else {
        this.pwdbtn = false;
      }
    },
    setPwd() {
      if (this.pwd1 && this.pwd2 && this.pwd3) {
        let url = "http://127.0.0.1:3030/v2/pro/setupwd";
        let data = `upwd=${this.pwd2}&uid=${this.uid}`;
        this.axios.put(url, data).then((res) => {
          if (res.data.code == 200) {
            Dialog.alert({
              title: "提示",
              message: "密码修改成功,请重新登录",
            }).then(() => {
              sessionStorage.removeItem("uname");
              this.$router.push("/login");
            });
          } else {
            Dialog.alert({
              title: "提示",
              message: "密码修改失败,请重试",
            }).then(() => {});
          }
        });
      } else {
        Dialog.alert({
          title: "提示",
          message: "请输入完整",
        }).then(() => {});
      }
    },
    setSex() {
      let url = "http://127.0.0.1:3030/v2/pro/setsex";
      let data = `gender=${this.radio}&uid=${this.uid}`;
      this.axios.put(url, data).then((res) => {
        if (res.data.code == 200) {
          Dialog.alert({
            title: "提示",
            message: "性别修改成功",
          }).then(() => {
            location.reload();
          });
        } else {
          Dialog.alert({
            title: "提示",
            message: "性别修改失败,请重试",
          }).then(() => {});
        }
      });
    },
    testPhone() {
      let url = `http://127.0.0.1:3030/v2/pro/testphone?phone=${this.phone1}`;
      if (this.phone1) {
        this.axios.get(url).then((res) => {
          if (res.data.code == 200) {
            this.phonebtn = false;
          } else {
            Dialog.alert({
              title: "提示",
              message: "手机号码不匹配",
            }).then(() => {
              this.phonebtn = true;
            });
          }
        });
      }
    },
    setPhone() {
      let url = "http://127.0.0.1:3030/v2/pro/setphone";
      let data = `phone=${this.phone2}&uid=${this.uid}`;
      if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(this.phone2)) {
        this.axios.put(url, data).then((res) => {
          if (res.data.code == 200) {
            Dialog.alert({
              title: "提示",
              message: "手机号码修改成功",
            }).then(() => {
              this.userInfo.phone = this.phone2;
              this.phoneshow = false;
            });
          } else {
            Dialog.alert({
              title: "提示",
              message: "手机号码修改失败,请重试",
            }).then(() => {});
          }
        });
      } else {
        Dialog.alert({
          title: "提示",
          message: "手机号码格式错误,请修改",
        }).then(() => {});
      }
    },
    testEmail() {
      let url = `http://127.0.0.1:3030/v2/pro/testemail?email=${this.email1}`;
      if (this.email1) {
        this.axios.get(url).then((res) => {
          if (res.data.code == 200) {
            this.emailbtn = false;
          } else {
            this.emailbtn = true;
          }
        });
      }
    },
    setEmail() {
      let url = "http://127.0.0.1:3030/v2/pro/setemail";
      let data = `email=${this.email2}&uid=${this.uid}`;
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.email2
        )
      ) {
        this.axios.put(url, data).then((res) => {
          if (res.data.code == 200) {
            Dialog.alert({
              title: "提示",
              message: "邮箱修改成功",
            }).then(() => {
              this.userInfo.email = this.email2;
              this.emailshow = false;
            });
          } else {
            Dialog.alert({
              title: "提示",
              message: "邮箱修改失败,请重试",
            }).then(() => {});
          }
        });
      } else {
        Dialog.alert({
          title: "提示",
          message: "邮箱格式错误,请修改",
        }).then(() => {});
      }
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
