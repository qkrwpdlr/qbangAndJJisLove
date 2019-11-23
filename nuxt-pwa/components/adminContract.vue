<template>
    <v-container>
        <v-text-field
            v-model="countNumber"
            :counter="12"
            :rules="countNumRules"
            label="계좌번호"
            required
        ></v-text-field>
        <v-text-field
            v-model="money"
            label="금액 - 원 단위로 써주세요"
            :rules="moneyRules"
            required
        ></v-text-field>
        <v-textarea
          solo
          class="mt-5"
          name="input-7-4"
          label="송금하는 사유를 써주세요. 다른 모든 투자자들이 보는 내용입니다~!"
          v-model="purpose"
        ></v-textarea>
          <v-overlay
            :absolute="false"
            :value="overlay"
          >
          <v-btn
            color="orange lighten-2"
            @click="overlay = false"
          >
          송금완료
          </v-btn>
        </v-overlay>
        <v-btn block color="secondary" dark @click="submit">예약 계좌이체</v-btn>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      overlay: false,
      money: "",
      countNumber: "",
      countNumRules: [
        v => !!v || "계좌번호는 반드시 입력바랍니다.",
        v => (v && v.length <= 12) || "계좌번호 확인 바랍니다."
      ],
      moneyRules: [v => !!v || "금액은 반드시 입력바랍니다."],
      purpose: ""
    };
  },
  methods: {
    submit: function() {
      this.$axios
        .post("/newTransfer", {
          money: this.money,
          toSend: this.countNumber,
          purpose: this.purpose
        })
        .then(() => {
          this.overlay = true;
        });
    }
  }
};
</script>

<style>
</style>
