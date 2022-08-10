<template>
  <div>
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="goBack"
      title="新增地址"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";
import { Dialog } from "vant";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    onSave(data) {
      //向数据库添加收货地址
      console.log(data);
      let {
        name,
        tel,
        province,
        city,
        county,
        addressDetail,
        postalCode,
        isDefault,
      } = data;
      let url = "http://127.0.0.1:3030/v2/pro/postLoac";
      let info = `lname=${name}&lphone=${tel}&province=${province}&city=${city}&county=${county}&addressDetail=${addressDetail}&postalCode=${postalCode}&isDefault=${
        isDefault ? 1 : 0
      }&user_id=${this.$route.params.uid}`;
      this.axios.post(url, info).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          Dialog.alert({
            title: "提示",
            message: "地址添加成功",
          }).then(() => {
            this.$router.push(`/receiving/${this.$route.params.uid}`);
          });
        }
      });
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      //地区提示
      // if (val) {
      //   this.searchResult = [
      //     {
      //       name: "黄龙万科中心",
      //       address: "杭州市西湖区",
      //     },
      //   ];
      // } else {
      //   this.searchResult = [];
      // }
    },
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
