<template>
    <v-col cols="12">
        <v-card
        color="white"
        class="mx-auto"
        >
        <v-card-subtitle>
            {{value.transferDate}} 등록
        <v-btn icon class="money-element--root-icon ml-10" @click="clickValid">
              <img :src="keyIcon" v-if="(!isLoading)&&isFirst">
              <img :src="unlockIcon" v-if="(!isLoading)&&(isError)&&(!isFirst)">
              <img :src="lockIcon" v-if="(!isLoading)&&(!isError)&&(!isFirst)">
              <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="amber" />
        </v-btn>
        </v-card-subtitle>
        <v-card-title class="justify-space-between pb-0 pt-0">
          <span>신한</span>
          <span>{{value.toSend}}</span>
        </v-card-title>
        <v-card-title class="justify-space-between pb-0 pt-0">
          <span>금액</span>
          <span class="">{{value.money}} 원</span>
        </v-card-title>
        <v-card-title>
          <span>거래목적</span>
        </v-card-title>

        <v-card-subtitle>
            {{value.purpose}}
        </v-card-subtitle>

        <v-card-actions class="justify-center" v-if="value.result == 0 && !isVoted">
            <v-btn small class="mr-3" color="red" dark @click="noClick" >반대</v-btn>
            <v-btn small primary class="ml-3" color="blue" dark @click="yesClick" >찬성</v-btn>
        </v-card-actions>
        <v-card-title class="justify-center blue--text" v-if="value.result == 0 && isVoted">
          투표하셨습니다
        </v-card-title>
        <v-card-title class="justify-center blue--text" v-if="value.result == 1">
          이미 처리된 계약입니다
        </v-card-title>
        <v-card-title class="justify-center red--text" v-if="value.result == 2">
          부결된 계약입니다
        </v-card-title>
        </v-card>
    </v-col>
</template>

<script>
import { keyIcon, lockIcon, unlockIcon } from "~/assets/icon/index";

export default {
  mounted() {
    if (localStorage.getItem(this.value.kind) == "active") {
      this.isVoted = true;
    }
  },
  data() {
    return {
      isLoading: false,
      isFirst: true,
      isError: false,
      keyIcon,
      lockIcon,
      unlockIcon,
      isVoted: false
    };
  },
  props: {
    value: {
      type: Object,
      default: function() {
        return {
          date: "2019.01.02",
          addr: "110401150366",
          cost: "4",
          content: "이유"
        };
      }
    },
    isDoing: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickValid: async function() {
      if (this.isFirst == false) {
        window.open(`https://baobab.scope.klaytn.com/tx/${this.value.hash}`);
        return;
      }
      this.isLoading = true;
      this.isFirst = false;
      var dataString = {
        jsonrpc: "2.0",
        method: "klay_getTransactionByHash",
        params: [this.value.hash],
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
    },
    noClick: async function() {
      this.isVoted = true;
      await this.$axios.post("/vote/sub", { kind: this.value.kind });
      localStorage.setItem(this.value.kind, "active");
    },
    yesClick: async function() {
      this.isVoted = true;
      await this.$axios.post("/vote/add", { kind: this.value.kind });
      localStorage.setItem(this.value.kind, "active");
    }
  }
};
</script>

<style>
.money-element--root-icon img {
  width: 20px;
}
.money-element--root-icon {
  position: absolute;
  right: 18px;
  top: 10px;
}
</style>
