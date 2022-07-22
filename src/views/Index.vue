<template>
  <div>
    <van-tabs v-model="activeName" color="#ffc107">
      <van-tab title="主页" name="a">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item
            @click="goPD(i.product_id)"
            v-for="(i, n) in lbt"
            :key="n"
            ><img :src="i.img" alt="" width="100%" height="15%"
          /></van-swipe-item>
        </van-swipe>
        <div
          class="van-hairline--bottom"
          style="height: 40px; line-height: 40px"
        >
          推荐商品
        </div>
        <p v-for="i in tj">
          <van-card
            tag="推荐"
            :desc="i.subtitle"
            :title="i.title"
            :thumb="i.img"
          >
            <template #footer>
              <van-button
                size="mini"
                plain
                color="#ffc107"
                @click="goPD(i.product_id)"
                >查看详情</van-button
              >
            </template>
          </van-card>
        </p>
        <div
          class="van-hairline--bottom"
          style="height: 40px; line-height: 40px"
        >
          活动商品
        </div>
        <p v-for="i in hd">
          <van-card
            tag="活动"
            :desc="i.subtitle"
            :title="i.title"
            :thumb="i.img"
          >
            <template #footer>
              <van-button
                size="mini"
                plain
                color="#ffc107"
                @click="goPD(i.product_id)"
                >查看详情</van-button
              >
            </template>
          </van-card>
        </p>
        <div
          class="van-hairline--bottom"
          style="height: 40px; line-height: 40px"
        >
          热销商品
        </div>
        <p v-for="i in rx">
          <van-card
            tag="热销"
            :desc="i.subtitle"
            :title="i.title"
            :thumb="i.img"
          >
            <template #footer>
              <van-button
                size="mini"
                plain
                color="#ffc107"
                @click="goPD(i.product_id)"
                >查看详情</van-button
              >
            </template>
          </van-card>
        </p>
      </van-tab>
      <van-tab title="活动" name="b" color="#ffc107">
        <van-tree-select
          height="100vh"
          :items="items"
          :main-active-index.sync="active"
        >
          <template #content>
            <div v-if="active === 0" v-for="i in qbhd">
              <van-card :desc="i.title" :title="i.aname" :thumb="i.img">
                <template #footer>
                  <van-button size="mini" plain color="#ffc107"
                    >查看详情</van-button
                  >
                </template>
              </van-card>
            </div>
            <div v-if="active === 1" v-for="i in xshd">
              <van-card :desc="i.title" :title="i.aname" :thumb="i.img">
                <template #footer>
                  <van-button size="mini" plain color="#ffc107"
                    >查看详情</van-button
                  >
                </template>
              </van-card>
            </div>
            <div v-if="active === 2" v-for="i in cqhd">
              <van-card :desc="i.title" :title="i.aname" :thumb="i.img">
                <template #footer>
                  <van-button size="mini" plain color="#ffc107"
                    >查看详情</van-button
                  >
                </template>
              </van-card>
            </div>
            <div v-if="active === 3" v-for="i in gqhd">
              <van-card :desc="i.title" :title="i.aname" :thumb="i.img">
                <template #footer>
                  <van-button size="mini" plain color="#ffc107"
                    >查看详情</van-button
                  >
                </template>
              </van-card>
            </div>
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
      lbt: "",
      hd: "",
      rx: "",
      tj: "",
      qbhd: "",
      xshd: "",
      cqhd: "",
      gqhd: "",
      scrollTop: 0,
    };
  },
  methods: {
    onChange(index) {
      Notify({ type: "primary", message: index });
    },
    goPD(id) {
      this.$router.push(`/productdetails/${id}`);
    },
    getLbt() {
      let url = "http://127.0.0.1:3030/v2/pro/lbt";
      this.axios.get(url).then((res) => {
        this.lbt = res.data.data;
      });
    },
    getHd() {
      let url = "http://127.0.0.1:3030/v2/pro/hd";
      this.axios.get(url).then((res) => {
        this.hd = res.data.data;
      });
    },
    getRx() {
      let url = "http://127.0.0.1:3030/v2/pro/rx";
      this.axios.get(url).then((res) => {
        this.rx = res.data.data;
      });
    },
    getTj() {
      let url = "http://127.0.0.1:3030/v2/pro/rx";
      this.axios.get(url).then((res) => {
        this.tj = res.data.data;
      });
    },
    getQbhd() {
      let url = "http://127.0.0.1:3030/v2/pro/activity";
      this.axios.get(url).then((res) => {
        this.qbhd = res.data.data;
      });
    },
    getXshd() {
      let url = "http://127.0.0.1:3030/v2/pro/activity?atime=1";
      this.axios.get(url).then((res) => {
        this.xshd = res.data.data;
      });
    },
    getCqhd() {
      let url = "http://127.0.0.1:3030/v2/pro/activity?atime=2";
      this.axios.get(url).then((res) => {
        this.cqhd = res.data.data;
      });
    },
    getGqhd() {
      let url = "http://127.0.0.1:3030/v2/pro/activity?atime=3";
      this.axios.get(url).then((res) => {
        this.gqhd = res.data.data;
      });
    },
    getbottom() {
      this.scrollTop = document.documentElement.scrollTop;
    },
  },
  mounted() {
    this.getLbt();
    this.getHd();
    this.getRx();
    this.getTj();
    this.getQbhd();
    this.getXshd();
    this.getCqhd();
    this.getGqhd();
    window.addEventListener("scroll", this.getbottom);
  },
  activated() {
    this.scrollTop = document.documentElement.scrollTop;
  },
  deactivated() {
    document.documentElement.scrollTop = this.scrollTop;
  },
};
</script>

<style lang="scss" scoped>
.van-sidebar-item--select::before {
  background-color: #ffc107;
}
</style>
