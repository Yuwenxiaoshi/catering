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
      <van-cell title="密码" value=">" />
      <van-cell
        title="性别"
        :value="userInfo.gender == 1 ? '男' : '女'"
        @click="setSexShow"
      />
      <van-cell title="电话" :value="userInfo.phone" />
      <van-cell title="邮箱" :value="userInfo.email" />
    </van-cell-group>
    <van-action-sheet v-model="usernameshow" title="修改用户名">
      <van-field
        v-model="username"
        type="text"
        label="用户名"
        placeholder="请输入用户名"
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
  </div>
</template>

<script>
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
    };
  },
  methods: {
    getMe() {
      let url = "http://127.0.0.1:3030/v2/pro/me";
      let data = `uname=${this.uname}`;
      this.axios.post(url, data).then((res) => {
        this.userInfo = res.data.data[0];
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
