<template>
  <div>
    <div v-if="!uname">
      <div style="height: 4vh"></div>
      <van-image
        width="100vw"
        height="40vh"
        fit="contain"
        :src="require(`/src/assets/Notifications_Isometric.png`)"
      />
      <div style="text-align: center; color: red" @click="goLogin">
        请先登录
      </div>
    </div>
    <div v-if="!data && uname">
      <div style="height: 4vh"></div>
      <van-image
        width="100vw"
        height="40vh"
        fit="contain"
        :src="require(`/src/assets/Designer _Isometric.png`)"
      />
      <div style="text-align: center; color: red">购物车为空</div>
    </div>
    <div v-if="data && uname">
      <div style="height: 2px"></div>
      <van-swipe-cell v-for="i in 5" :key="i">
        <van-card
          price="2.00"
          desc="描述信息"
          title="商品标题"
          thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        >
          <template #footer>
            <van-stepper v-model="value" />
          </template>
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <div style="height: 50px"></div>
      <van-submit-bar
        :price="0"
        button-text="提交订单"
        @submit="onSubmit"
        style="margin-bottom: 50px"
      >
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: 1,
      uname: "",
      value: 1,
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    onSubmit() {
      alert("购买成功");
    },
  },
  mounted() {
    this.uname = sessionStorage.getItem("uname") || "";
  },
};
</script>

<style lang="scss" scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
</style>
