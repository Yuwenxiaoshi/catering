<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入商品关键词"
        @search="onSearch"
        @cancel="onCancel"
        @keydown="getP"
      />
    </form>
    <p v-for="i in data" :key="i.lid">
      <van-card
        :price="i.price"
        :desc="i.subtitle"
        :title="i.title"
        :thumb="i.img"
        @click="goPD(i.lid)"
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
      data: {},
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
    goPD(id) {
      this.$router.push(`/productdetails/${id}`);
    },
    getP(str = "") {
      let url = `http://127.0.0.1:3030/v2/pro/prolist?lname=${str}`;
      this.axios.get(url).then((res) => {
        this.data = res.data.data;
      });
    },
  },
  mounted() {
    this.value = this.$route.params.name;
    this.getP(this.$route.params.name);
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
