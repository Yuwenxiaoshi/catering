<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入商品关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      value: "",
    };
  },
  methods: {
    onSearch() {
      this.$router.push(`/productlist/${this.value}`);
    },
    onCancel() {
      this.$router.push("/search");
      window.sessionStorage.setItem("active", "Search");
      this.value = "";
    },
    goPD() {
      this.$router.push(`/productdetails/${1}`);
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
