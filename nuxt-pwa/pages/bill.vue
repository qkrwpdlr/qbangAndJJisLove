<template>
  <v-container>
    <v-expansion-panels accordion>
        <template v-for="(data,i) in datas">
          <money-element :value="data" :key="i" v-if="!admin"/>
          <admin-money :value="data" :key="i" v-if="admin"/>
        </template>
    </v-expansion-panels>
    </v-container>
</template>

<script>
import moneyElement from "~/components/moneyElement";
import adminMoney from "~/components/adminMoney";
export default {
  async asyncData({ $axios }) {
    let res = await $axios.get("/allData");
    return {
      datas: res.data
    };
  },
  components: {
    moneyElement,
    adminMoney
  },
  mounted() {
    if (localStorage.getItem("admin") == "admin") {
      this.admin = true;
    } else {
    }
  },
  data: function() {
    return {
      admin: false,
      datas: [
        {
          date: "2019.01.02",
          location: "진로 마트",
          price: "42000",
          cause: "이러저러해서 썼습니다."
        },
        {
          date: "2019.01.03",
          location: "진로 마트",
          price: "42000",
          cause: "이러저러해서 썼습니다."
        },
        {
          date: "2019.01.02",
          location: "진로 마트",
          price: "42000",
          cause: "이러저러해서 썼습니다."
        },
        {
          date: "2019.01.02",
          location: "진로 마트",
          price: "42000",
          cause: "이러저러해서 썼습니다."
        },
        {
          date: "2019.01.02",
          location: "진로 마트",
          price: "42000",
          cause: "이러저러해서 썼습니다."
        },
        {
          date: "2019.01.02",
          location: "진로 마트",
          price: "42000",
          cause: "이러저러해서 썼습니다."
        },
        {
          date: "2019.01.02",
          location: "진로 마트",
          price: "42000",
          cause: "이러저러해서 썼습니다."
        },
        {
          date: "2019.01.02",
          location: "진로 마트",
          price: "42000",
          cause: "이러저러해서 썼습니다."
        },
        {
          date: "2019.01.02",
          location: "진로 마트",
          price: "42000",
          cause: "이러저러해서 썼습니다."
        },
        {
          date: "2019.01.02",
          location: "진로 마트",
          price: "42000",
          cause: "이러저러해서 썼습니다."
        }
      ]
    };
  }
};
</script>

<style>
</style>
