<template>
  <div>
    <van-tabs v-model="activeName" color="#ffc107">
      <van-tab title="主页" name="a">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item @click="goPD">1</van-swipe-item>
          <van-swipe-item>2</van-swipe-item>
          <van-swipe-item>3</van-swipe-item>
          <van-swipe-item>4</van-swipe-item>
        </van-swipe>
        <!-- <div
          class="van-hairline--bottom"
          style="height: 40px; line-height: 40px"
        >
          推荐商品
        </div>
        <p v-for="i in 5" :key="i">
          <van-card
            tag="推荐"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
            @click="goPD"
          />
        </p>
        <div
          class="van-hairline--bottom"
          style="height: 40px; line-height: 40px"
        >
          活动商品
        </div>
        <p v-for="i in 5" :key="i">
          <van-card
            tag="活动"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
            @click="goPD"
          />
        </p>
        <div
          class="van-hairline--bottom"
          style="height: 40px; line-height: 40px"
        >
          热销商品
        </div>
        <p v-for="i in 5" :key="i">
          <van-card
            tag="热销"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
            @click="goPD"
          />
        </p> -->
      </van-tab>
      <van-tab title="活动" name="b" color="#ffc107">
        <van-tree-select
          height="100vh"
          :items="items"
          :main-active-index.sync="active"
        >
          <template #content>
            <van-card
              v-if="active === 0"
              tag="标签"
              price="2.00"
              desc="描述信息"
              title="商品标题"
              thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
            />
            <van-card
              v-if="active === 1"
              tag="现时"
              price="2.00"
              desc="描述信息"
              title="商品标题"
              thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
            />
          </template>
        </van-tree-select>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "a",
      active: 0,
      items: [
        { text: "全部活动" },
        { text: "限时活动" },
        { text: "长期活动" },
        { text: "过期活动" },
      ],
    };
  },
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    goPD() {
      this.$router.push(`/productdetails/${1}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-sidebar-item--select::before {
  background-color: #ffc107;
}
</style>
