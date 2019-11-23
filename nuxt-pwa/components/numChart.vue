<template>
    <div class="num-chart--root-div" :style="fontStyle">
        <v-layout column align-center>
            <div class="num-chart--root-div--row-div mt-2">
                <span>총 기부금액</span> 
            <count-span :num="allMoney"/></div>
            <div class="num-chart--root-div--row-div mt-2">
                <span>집행금액</span> 
            <count-span :num="datas.donation"/></div>
            <div class="num-chart--root-div--row-div mt-2">
                <span>운영금액</span> 
            <count-span :num="datas.cost"/></div>
            <div class="num-chart--root-div--row-div mt-2">
                <span>여유금액</span> 
            <count-span :num="datas.rest"/></div>
        </v-layout>
    </div>
</template>

<script>
import countSpan from "./countSpan";
export default {
  mounted() {
    if (innerWidth < 640) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  },
  components: {
    countSpan
  },
  data() {
    return {
      mobile: false
    };
  },
  props: {
    datas: {
      type: Object,
      default: function() {
        return {
          rest: 10,
          donation: 20,
          cost: 10
        };
      }
    }
  },
  computed: {
    allMoney: function() {
      return this.datas.rest + this.datas.donation + this.datas.cost;
    },
    fontStyle: function() {
      if (this.mobile) {
        return {
          fontSize: "20px"
        };
      } else {
        return {
          fontSize: "30px"
        };
      }
    }
  }
};
</script>

<style>
.num-chart--root-div--row-div {
  width: 350px;
  display: flex;
  justify-content: space-between;
}
</style>
