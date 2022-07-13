<template>
  <div>
    <my-header v-if="!this.$route.meta.noshow"></my-header>
    <router-view></router-view>
    <my-footer v-if="!this.$route.meta.noshow"></my-footer>
  </div>
</template>

<script>
import MyFooter from "./components/MyFooter.vue";
import MyHeader from "./components/MyHeader.vue";
export default {
  components: { MyFooter, MyHeader },
  mounted() {
    console.log(this.$route.meta.noshow);
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
