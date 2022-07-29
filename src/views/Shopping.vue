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
      <van-swipe-cell v-for="(i, n) in data" :key="n">
        <van-card
          :price="i.price"
          :desc="i.subtitle"
          :title="i.title"
          :thumb="i.limg"
          :thumb-link="`/productdetails/${i.product_id}`"
        >
          <template #footer>
            <van-stepper
              v-model="i.count"
              theme="round"
              button-size="22"
              disable-input
              @change="setCount(i.count, i.product_id)"
            />
            <van-checkbox
              v-model="i.is_checked"
              checked-color="#ffc107"
              @click="setCheck(i.is_checked, i.product_id)"
              >选中</van-checkbox
            >
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="delPd(i.product_id)"
          />
        </template>
      </van-swipe-cell>
      <div style="height: 50px"></div>
      <van-submit-bar
        :price="totalPrice"
        button-text="提交订单"
        @submit="onSubmit"
        style="margin-bottom: 50px"
      >
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      data: null,
      uname: "",
      prices: 0,
      timeOut: null,
      timeOut2: null,
    };
  },
  computed: {
    totalPrice() {
      return this.data
        .filter((item) => item.is_checked)
        .reduce((pre, cur) => {
          return pre + cur.price * cur.count * 100;
        }, 0);
    },
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    onSubmit() {
      let url = `http://127.0.0.1:3030/v2/pro/buy?uname=${this.uname}`;
      this.axios.delete(url).then((res) => {
        if (res.data.code == 200) {
          Dialog.alert({
            title: "提示",
            message: "购买成功",
          }).then(() => {
            this.data.map((item, i) => {
              if (item.is_checked) {
                this.data.splice(i, 1);
              }
            });
          });
        } else {
          Dialog.alert({
            title: "提示",
            message: "购买失败,请重试",
          }).then(() => {});
        }
      });
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
    delPd(id) {
      let url = `http://127.0.0.1:3030/v2/pro/delPd?uname=${sessionStorage.getItem(
        "uname"
      )}&id=${id}`;
      this.axios.delete(url).then((res) => {
        if (res.data.code == 200) {
          Dialog.alert({
            title: "提示",
            message: "删除成功",
          }).then(() => {
            location.reload();
          });
        }
      });
    },
    setCheck(check, id) {
      let url = "http://127.0.0.1:3030/v2/pro/put";
      let data = `check=${check ? 1 : 0}&uname=${this.uname}&lid=${id}`;
      if (this.timeOut !== null) clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.axios.put(url, data).then((res) => {
          console.log(check, res.data);
        });
      }, 1000);
    },
    setCount(count, id) {
      let url = "http://127.0.0.1:3030/v2/pro/putselect";
      let data = `count=${count}&uname=${this.uname}&lid=${id}`;
      if (this.timeOut2 !== null) clearTimeout(this.timeOut2);
      this.timeOut2 = setTimeout(() => {
        this.axios.put(url, data).then((res) => {
          console.log(res.data);
        });
      }, 1000);
    },
    Buy() {},
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
