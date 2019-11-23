<template>
    <div id="lottie-giver--root">
        <lottie v-if="canRender" :options="defaultOptions" :height="lottieSize-25" :width="lottieSize" v-on:animCreated="handleAnimation"/>
        <v-row
          :align="'center'"
          :justify="'center'"
          class="lottie-giver--root--span-div mt-6 mb-6">
          <span>사랑을 전달하는 중..</span>
        </v-row>
    </div>
</template>

<script>
import Lottie from "./index";
import * as animationData from "~/assets/heart.json";

export default {
  mounted() {
    if (innerWidth < 640) {
      this.lottieSize = window.innerWidth - 20;
    } else {
      this.lottieSize = 650;
    }
    this.canRender = true;
  },
  name: "lottieGiver",
  components: {
    lottie: Lottie
  },
  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2,
      lottieSize: 300,
      canRender: false
    };
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },

    stop: function() {
      this.anim.stop();
    },

    play: function() {
      this.anim.play();
    },

    pause: function() {
      this.anim.pause();
    },

    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed);
    }
  }
};
</script>
<style>
.lottie-giver--root--span-div span {
  font-size: 30px;
}
</style>

