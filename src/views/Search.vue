<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-image
      width="100vw"
      height="50vh"
      fit="contain"
      :src="require(`/src/assets/Search engine _Monochromatic.png`)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onSearch() {
      this.$router.push(`/productlist/${this.value}`);
    },
    onCancel() {
      this.value = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
