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
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="收藏" color="#bbb" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="setShow"
      />
      <van-goods-action-button type="danger" text="立即购买" @click="setShow" />
    </van-goods-action>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
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
  },
  mounted() {
    this.getPD(this.$route.params.id);
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
