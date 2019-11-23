<template>
    <div class="pi-chart--root-div">
        <canvas ref="piChart"/>
    </div>
</template>

<script>
import Chart from "chart.js";
export default {
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
  mounted() {
    var config = {
      type: "pie",
      data: {
        datasets: [
          {
            data: [this.datas.rest, this.datas.cost, this.datas.donation],
            backgroundColor: ["rgb(105,106,110)","rgb(1,75,136)","rgb(120,206,241)"]
          }
        ],
        labels: ["남은 기부금", "운영비", "집행금"]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {}
        }
      }
    };
    var ctx = this.$refs.piChart.getContext("2d");
    window.myPie = new Chart(ctx, config);

    // window.onload = () => {
    //   var ctx = this.$refs.piChart.getContext("2d");
    //   window.myPie = new Chart(ctx, config);
    // };
  }
};
</script>

<style>
.pi-chart--root-div {
  margin-top: 10px;
}
</style>
