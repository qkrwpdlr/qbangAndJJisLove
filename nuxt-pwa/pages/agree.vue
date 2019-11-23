<template>
  <v-container>
    <template v-for="(data,index) in datas" v-if="!admin">
      <money-card :value="data" :key='index' :isDoing="data.doing"/>
    </template> 
    <admin-card v-if="admin"/>
  </v-container>
</template>

<script>
import moneyCard from "~/components/moneyCard";
import adminCard from "~/components/adminContract";
export default {
  async asyncData({ $axios }) {
    let { data } = await $axios.get("/getAllTransfer");
    return {
      datas: data
    };
  },
  mounted() {
    if (localStorage.getItem("admin") == "admin") {
      this.admin = true;
    }
  },
  components: {
    moneyCard,
    adminCard
  },
  data() {
    return {
      admin: false,
      datas: [
        {
          date: "2019.01.02",
          addr: "110401150366",
          cost: "4",
          content: "A 유기견 보호센터에 기부를 합니다.",
          doing: true
        },
        {
          date: "2019.01.02",
          addr: "110401150366",
          cost: "4",
          content: "A 유기견 보호센터에 기부를 합니다.",
          doing: false
        },
        {
          date: "2019.01.02",
          addr: "110401150366",
          cost: "4",
          content: "A 유기견 보호센터에 기부를 합니다.",
          doing: false
        },
        {
          date: "2019.01.02",
          addr: "110401150366",
          cost: "4",
          content: "A 유기견 보호센터에 기부를 합니다.",
          doing: false
        }
      ]
    };
  }
};
</script>

<style>
</style>
