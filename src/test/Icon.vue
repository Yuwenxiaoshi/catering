<template>
  <div>
    <van-uploader :after-read="afterRead" multiple />
    <p>{{ content }}</p>
    <img class="head-img" src="" ref="goodsImg" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    afterRead(file) {
      let url = "http://127.0.0.1:3030/v2/pro/upload";
      let data = new FormData();
      data.append("uploadFile", file.file);
      this.axios.post(url, data).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
