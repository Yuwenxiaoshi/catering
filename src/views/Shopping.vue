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
      <van-swipe-cell v-for="i in data" :key="i.product_id">
        <van-card
          :price="i.price"
          :desc="i.subtitle"
          :title="i.title"
          :thumb="i.limg"
          :thumb-link="`http://localhost:8080/productdetails/${i.product_id}`"
        >
          <template #footer>
            <van-stepper
              v-model="i.count"
              theme="round"
              button-size="22"
              disable-input
              :change="addPrice(i.price, i.count)"
            />
          </template>
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <div style="height: 50px"></div>
      <van-submit-bar
        :price="price"
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
      data: null,
      uname: "",
      price: 0,
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    onSubmit() {
      alert("购买成功");
    },
    getShopping() {
      let url = `http://127.0.0.1:3030/v2/pro/shopping?uname=${this.uname}`;
      this.axios.get(url).then((res) => {
        this.data = res.data.data;
      });
    },
    goPD(id) {
      this.$router.push(`/productdetails/${id}`);
    },
    addPrice(price, num) {
      this.price = 0;
      this.price += price * num;
    },
  },
  mounted() {
    this.uname = sessionStorage.getItem("uname") || "";
    this.getShopping();
  },
};
</script>

<style lang="scss">
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.van-card__price {
  color: red;
}
.van-stepper--round .van-stepper__minus {
  color: #ffc107;
  border-color: #ffc107;
}
.van-stepper--round .van-stepper__plus {
  background-color: #ffc107;
}
</style>
