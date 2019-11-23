<template>
    <span>{{numString}}</span>
</template>

<script>
export default {
  data() {
    return {
      allNum: 0,
      isInit: false
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      let pointer = window.scrollY + window.innerHeight;
      if (pointer + 100 > this.$el.offsetTop && this.isInit == false) {
        this.updateNumber();
        this.isInit = true;
      }
    });
  },
  props: {
    num: {
      type: Number,
      default: 1
    }
  },
  computed: {
    numString: function() {
      let temp = "";
      let allNum = `${this.allNum}`;
      for (let i = 0; i < allNum.length; i++) {
        temp += allNum[i];
        if ((i + 2) % 3 == 0 && i != allNum.length - 1) {
          temp += ",";
        }
      }
      let tempIndex = `${this.num}`.length - temp.length;
      for (let i = 0; i < tempIndex; i++) {
        temp = " " + temp;
      }
      return temp + "원";
    }
  },
  methods: {
    updateNumber: async function() {
      for (let i = 0; i < this.num; i += 52423) {
        await delay(1);
        this.allNum = i;
      }
      this.allNum = this.num;
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
</style>
