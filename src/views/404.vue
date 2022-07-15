<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="goBack" />
    <van-image
      width="100vw"
      height="50vh"
      fit="contain"
      :src="require(`/src/assets/404 Page Not Found _Flatline.png`)"
    />
    <div class="van-hairline--bottom" style="text-align: center">
      找不到网页,请返回
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      window.history.back(-1);
    },
  },
};
</script>

<style lang="scss">
.van-nav-bar__text {
  color: black !important;
}
.van-icon-arrow-left:before {
  color: #ffc107 !important;
}
</style>
