<template>
  <div>
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="goBack"
      title="收货地址"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
  },
  mounted() {
    this.selectList();
  },
  methods: {
    onAdd() {
      this.$router.push(`/newreceiving/${this.$route.params.uid}`);
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    goBack() {
      window.history.back(-1);
    },
    selectList() {
      let url = `http://127.0.0.1:3030/v2/pro/loac?uid=${this.$route.params.uid}`;
      this.axios.get(url).then((res) => {
        let info = res.data.data;
        info.forEach((item, index) => {
          if (item.isDefault == 1) {
            this.chosenAddressId = index;
            this.list.push({
              id: index,
              name: item.lname,
              tel: item.lphone,
              address:
                item.province + item.city + item.county + item.addressDetail,
              isDefault: item.isDefault ? true : false,
            });
          } else if (item.isDefault == 0) {
            setTimeout(() => {
              this.list.push({
                id: index,
                name: item.lname,
                tel: item.lphone,
                address:
                  item.province + item.city + item.county + item.addressDetail,
                isDefault: item.isDefault ? true : false,
              });
            }, 0);
          }
        });
      });
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
