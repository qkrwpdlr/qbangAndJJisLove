<template>
        <v-expansion-panel>
            <div class="money-element--root--div">
                <v-btn icon class="money-element--root-icon" @click="clickValid">
                    <img :src="keyIcon" v-if="(!isLoading)&&isFirst">
                    <img :src="unlockIcon" v-if="(!isLoading)&&(isError)&&(!isFirst)">
                    <img :src="lockIcon" v-if="(!isLoading)&&(!isError)&&(!isFirst)">
                    <v-progress-circular
                    v-if="isLoading"
                    indeterminate
                    color="amber" />
                </v-btn>
                <span class="money-element--root-date">{{value.kind}}</span>
                <span class="money-element--root-title">{{value.clientSell}}</span>
                <span class="money-element--root-price">{{value.inOutMoney}} 원</span>
            </div>
            <v-expansion-panel-header></v-expansion-panel-header>
            <v-expansion-panel-content>
                {{cause}}
            </v-expansion-panel-content>
      </v-expansion-panel>
</template>

<script>
import { keyIcon, lockIcon, unlockIcon } from "~/assets/icon/index";
export default {
  props: {
    value: {
      type: Object,
      default: function() {
        return {
          date: "2019.01.02",
          location: "진로 마트",
          price: "42000",
          cause: "이러저러해서 썼습니다."
        };
      }
    }
  },
  computed: {
    cause: function() {
      if (this.value.content == null) {
        return "아직 사유작성을 하지 않았습니다";
      } else {
        return this.value.content;
      }
    }
  },
  data() {
    return {
      isLoading: false,
      isFirst: true,
      isError: false,
      keyIcon,
      lockIcon,
      unlockIcon
    };
  },
  methods: {
    clickValid: async function() {
      if (this.isFirst == false) {
        window.open(`https://baobab.scope.klaytn.com/tx/${this.value.hash_1}`);
        return;
      }
      this.isLoading = true;
      this.isFirst = false;
      var dataString = {
        jsonrpc: "2.0",
        method: "klay_getTransactionByHash",
        params: [this.value.hash_1],
        id: 1
      };
      var options = {
        url: "https://api.baobab.klaytn.net:8651/",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: dataString
      };
      let res = await this.$axios(options);
      let decodeRes = await this.$axios.get("/hexToUtf8", {
        params: {
          payload: res.data.result.input
        }
      });
      setTimeout(() => {
        this.isLoading = false;
        let decodeData = decodeRes.data;
        let keys = Object.keys(decodeData);
        for (let i in keys) {
          if (decodeData[keys[i]] == this.value[keys[i]]) {
          } else {
            this.isError = true;
          }
        }
      }, 1000);
    }
  }
};
</script>

<style>
.money-element--root--div {
  display: block;
  margin-top: 10px;
  width: 100%;
  height: 50px;
  position: relative;
}
.money-element--root-date {
  color: rgb(130, 130, 130);
  margin-top: 3px;
  margin-left: 18px;
  font-size: 12px;
  display: block;
}
.money-element--root-title {
  margin-left: 18px;
  font-size: 20px;
  font-weight: bold;
}
.money-element--root-price {
  margin-left: 10px;
  color: rgb(130, 130, 130);
  font-size: 15px;
}
.money-element--root-icon {
  position: absolute;
  right: 18px;
  top: 10px;
}
.money-element--root-icon img {
  width: 20px;
}
</style>
