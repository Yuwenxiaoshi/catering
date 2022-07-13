<template>
  <div>
    <div style="height: 20px; line-height: 1.25rem; color: red" @click="goBack">
      <van-icon name="arrow-left" />返回
    </div>
    <van-image
      width="100vw"
      height="35vh"
      src="http://127.0.0.1:3030/img/v2-c191864f30cd48cb36988ea60b455c56_r.jpg"
      @click="pigImg"
    />
    <div style="font-size: 2rem; line-height: 2.5rem; height: 2.5rem">
      臭豆腐
    </div>
    <van-rate
      v-model="value"
      allow-half
      void-icon="star"
      void-color="#eee"
      readonly
    />
    <div style="font-size: 1rem; line-height: 1.5rem; height: 1.5rem">
      商品详情
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="收藏" color="#bbb" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      value: 5,
    };
  },
  methods: {
    pigImg() {
      ImagePreview([
        "http://127.0.0.1:3030/img/v2-c191864f30cd48cb36988ea60b455c56_r.jpg",
      ]);
    },
    goBack() {
      window.history.back(-1);
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
