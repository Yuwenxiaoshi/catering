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
      商品详情 <button @click="setShow">123456</button>
    </div>

    <van-sku v-model="show" :sku="sku" :goods="goods" />
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
      value: 5,
      show: false,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
                imgUrl: "https://img01.yzcdn.cn/1.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "https://img01.yzcdn.cn/1p.jpg", // 用于预览显示的规格类目图片
              },
              {
                id: "1",
                name: "蓝色",
                imgUrl: "https://img01.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img01.yzcdn.cn/2p.jpg",
              },
            ],
            largeImageMode: true, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "1", // 是否必填 '1' 表示必填
            placeholder: "", // 可选值，占位文本
            extraDesc: "", // 可选值，附加描述文案
          },
        ],
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img01.yzcdn.cn/1.jpg",
      },
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
    setShow() {
      if (this.show == false) {
        this.show == true;
      } else {
        this.show == false;
      }
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
