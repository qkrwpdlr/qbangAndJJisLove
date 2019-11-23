<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow>
      <v-list>
        <v-list-item link @click="$router.push('/')">
          <v-list-item-icon>
            <img :src="homeIcon" width="30px">
          </v-list-item-icon>
        </v-list-item>
        <v-list-item link @click="$router.push('bill')">
          <v-list-item-icon>
            <img :src="listIcon" width="30px">
          </v-list-item-icon>
        </v-list-item>
        <v-list-item link @click="$router.push('agree')">
          <v-list-item-icon>
            <img :src="bankIcon" width="30px" v-if="admin">
            <img :src="voteIcon" width="30px" v-if="!admin">
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
    >
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <v-toolbar-title @click="changeMod">Nerly</v-toolbar-title>
    </v-app-bar>

    <v-content class="root--back--div">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer
      :inset="footer.inset"
      app
    >
      <span class="px-4">
        &copy; {{ new Date().getFullYear() }} 수제쿠키

      </span>
    </v-footer>
  </v-app>
</template>

<script>
import { bankIcon, homeIcon, listIcon, voteIcon } from "~/assets/icon/index.js";
export default {
  mounted() {
    if (localStorage.getItem("admin") == "admin") {
      this.admin = true;
    }
  },
  data: () => ({
    admin: false,
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: false,
      floating: false,
      mini: true
    },
    bankIcon,
    homeIcon,
    listIcon,
    voteIcon,
    footer: {
      inset: false
    },
    items: [
      { icon: "mdi-home-city" },
      { icon: "mdi-account" },
      { icon: "mdi-account-group-outline" }
    ]
  }),
  methods: {
    changeMod: function() {
      if (localStorage.getItem("admin") == "admin") {
        localStorage.removeItem("admin");
      } else {
        localStorage.setItem("admin", "admin");
      }
    }
  }
};
</script>
<style>
.root--back--div {
  background-color: rgb(238, 238, 238);
}
</style>
