<template>
    <div id="lottie-giver--root">
        <lottie v-if="canRender" :options="defaultOptions" :height="lottieSize-25" :width="lottieSize" v-on:animCreated="handleAnimation"/>
        <v-row
          :align="'center'"
          :justify="'center'"
          class="lottie-giver--root--span-div mt-6 mb-6">
          <span>{{memo}}{{pot}}</span>
        </v-row>
    </div>
</template>

<script>
import Lottie from "./index";
import * as animationData from "~/assets/test.json";

export default {
  async mounted() {
    if (window.innerWidth < 640) {
      this.lottieSize = window.innerWidth - 20;
    } else {
      this.lottieSize = 650;
    }
    this.canRender = true;
    let index = 0;
    for (let i = 0; i < 100; i++) {
      await delay(1000);
      this.pot = ".";
      for (let j = 0; j < i % 4; j++) {
        this.pot += ".";
      }
    }
  },
  name: "lottieGiver",
  components: {
    lottie: Lottie
  },
  data() {
    return {
      memo: "희망을 전달하는 중",
      pot: "",
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2,
      lottieSize: 300,
      canRender: false,
      index: 0
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
function delay(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
</script>
<style>
.lottie-giver--root--span-div span {
  font-size: 30px;
}
</style>

