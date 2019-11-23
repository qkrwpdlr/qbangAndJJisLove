<template>
  <v-container>
    <template v-for="(data,index) in datas">
      <money-card :value="data" :key='index' :isDoing="data.doing"/>
    </template> 
  </v-container>
</template>

<script>
import moneyCard from "~/components/moneyCard";
export default {
  async asyncData({ $axios }) {
    let { data } = await $axios.get("/getAllTransfer");
    console.log(data);
    return {
      datas: data
    };
  },
  components: {
    moneyCard
  },
  data() {
    return {
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
