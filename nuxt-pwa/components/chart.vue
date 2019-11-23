<template>
    <div class="container">
    <pi-chart :datas="datas"/>
    <hr class="chart--hr mt-2 mb-2">
    <num-chart :datas="datas"/>
    </div>
</template>

<script>
import piChart from "./piChart";
import numChart from "./numChart";

export default {
  components: {
    piChart,
    numChart
  },
  data() {
    return {
      datas: {
        rest: 2000000,
        donation: 10000000,
        cost: 1200000
      }
    };
  }
};
</script>

<style>
.chart--hr {
}
</style>
