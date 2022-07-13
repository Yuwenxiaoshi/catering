<template>
  <div>
    <van-row>
      <van-col span="8">
        <van-image
          round
          width="33vw"
          height="33vw"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
      /></van-col>
      <van-col span="16">
        <van-cell-group inset>
          <van-cell title="用户名" value="内容" />
          <van-cell title="邮箱" value="内容" />
          <van-cell title="电话" value="内容" /> </van-cell-group
      ></van-col>
    </van-row>
    <van-cell-group inset>
      <van-cell title="单元格" value="内容" @click="bj" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  methods: {
    bj() {
      alert("下班");
    },
  },
};
</script>

<style lang="scss" scoped></style>
