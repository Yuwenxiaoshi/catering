<template>
  <div>
    <my-header v-if="!this.$route.meta.Headernoshow"></my-header>

    <keep-alive>
      <router-view v-if="this.$route.meta.keep"></router-view>
    </keep-alive>
    <router-view v-if="!this.$route.meta.keep"></router-view>
    <my-footer v-if="!this.$route.meta.Footernoshow"></my-footer>
  </div>
</template>

<script>
import MyFooter from "./components/MyFooter.vue";
import MyHeader from "./components/MyHeader.vue";
export default {
  components: { MyFooter, MyHeader },
  mounted() {
    console.log(this.$route.meta.keep);
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
