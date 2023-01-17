<template>
  <overlay-loading v-if="isLoading"></overlay-loading>
  <router-view></router-view>
</template>

<script>
import OverlayLoading from "./components/OverlayLoading.vue";
import {mapState} from "pinia";
import {loadingStore} from "./stores/loading.js";

export default {
  name: "App",
  components: {
    OverlayLoading
  },
  computed: {
    ...mapState(loadingStore, ['isLoading'])
  }
}
</script>
