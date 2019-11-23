<template>
        <v-expansion-panel>
            <div class="money-element--root--div">
                <v-btn icon class="money-element--root-icon" @click="write" v-if="value.content==null">
                  <v-icon color="yellow darken-3">mdi-pencil</v-icon>          
                </v-btn>
                <span class="money-element--root-date">{{value.kind}}</span>
                <span class="money-element--root-title">{{value.clientSell}}</span>
                <span class="money-element--root-price">{{value.inOutMoney}} 원</span>
            </div>
          <template v-if="value.content==null">
            <v-textarea
            label="사용내역을 써주세요"
            auto-grow
            rows="2"
            class="ml-2 mr-2"
            row-height="25"
            v-model="content"
            shaped
          ></v-textarea>
        </template>
        <template v-if="value.content!=null">
            <v-expansion-panel-header></v-expansion-panel-header>
            <v-expansion-panel-content>
                {{value.content}}
            </v-expansion-panel-content>
        </template>
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
      if (this.value.cause == null) {
        return "아직 사유작성을 하지 않았습니다";
      } else {
        return this.value.cause;
      }
    }
  },
  data() {
    return {
      content: "",
      isLoading: false,
      isFirst: true,
      isError: false,
      keyIcon,
      lockIcon,
      unlockIcon
    };
  },
  methods: {
    write: async function() {
      let { data } = await this.$axios.post("/writeReview", {
        id: this.value.id,
        content: this.content
      });
      console.log(data);
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
/* .money-element--root-icon img {
  width: 20px;
} */
</style>
