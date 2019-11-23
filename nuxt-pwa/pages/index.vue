<template>
  <div class="white--is--good--and--yam">
    <lottie-component v-if="!admin"/>
    <heart-component v-if="admin"/>
    <chart-component />
  </div>
</template>

<script>
import lottieComponent from "~/components/lottie/giver";
import heartComponent from "~/components/lottie/heart";
import chartComponent from "~/components/chart";

export default {
  mounted() {
    if (localStorage.getItem("admin") == "admin") {
      this.admin = true;
    }
  },
  data() {
    return {
      admin: false
    };
  },
  components: {
    lottieComponent,
    chartComponent,
    heartComponent
  }
};
</script>

<style>
.white--is--good--and--yam {
  background-color: white;
}
</style>
