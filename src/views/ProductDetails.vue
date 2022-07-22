<template>
  <div v-if="data">
    <div style="height: 20px; line-height: 1.25rem; color: red" @click="goBack">
      <van-icon name="arrow-left" />
    </div>
    <van-image width="100vw" height="35vh" :src="data.img" @click="pigImg" />
    <div style="font-size: 2rem; line-height: 2.5rem; height: 2.5rem">
      {{ data.title }}
    </div>
    <van-rate
      v-model="value"
      allow-half
      void-icon="star"
      void-color="#eee"
      readonly
    />
    <van-divider />
    <h4>商品详情:</h4>
    <div style="font-size: 1rem; line-height: 1.5rem; height: 1.5rem">
      {{ data.subtitle }}
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="goSc" />
      <van-goods-action-icon icon="star" text="收藏" color="#bbb" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addSc"
        :disabled="uname ? false : true"
      />
      <van-goods-action-button type="danger" text="立即购买" @click="setShow" />
    </van-goods-action>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      uname: null,
      value: 4.5,
      data: {},
    };
  },
  methods: {
    pigImg() {
      ImagePreview([this.data.img]);
    },
    goBack() {
      window.history.back(-1);
    },
    setShow() {
      if (this.show == false) {
        this.show == true;
      } else {
        this.show == false;
      }
    },
    getPD(id) {
      let url = `http://127.0.0.1:3030/v2/pro/getPD?id=${id}`;
      this.axios.get(url).then((res) => {
        this.data = res.data.data[0];
      });
    },
    addSc() {
      let url = "http://127.0.0.1:3030/v2/pro/postlist";
      let proInfo = this.data;
      let data = `img=${proInfo.img}&subtitle=${
        proInfo.subtitle
      }&uname=${sessionStorage.getItem("uname")}&lid=${
        this.$route.params.id
      }&title=${proInfo.title}&price=${proInfo.price}`;
      this.axios.post(url, data).then((res) => {
        if (res.data.code == 200) {
          Dialog.alert({
            title: "提示",
            message: "添加成功",
          }).then(() => {
            return;
          });
        }
      });
      Dialog.alert({
        title: "提示",
        message: "购物车已有该物品",
      }).then(() => {
        location.reload();
      });
    },
    goSc() {
      if (this.uname) {
        this.$router.push("/shopping");
      } else {
        Dialog.alert({
          title: "提示",
          message: "请先登录",
        }).then(() => {});
      }
    },
  },
  mounted() {
    this.getPD(this.$route.params.id);
    this.uname = sessionStorage.getItem("uname");
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
