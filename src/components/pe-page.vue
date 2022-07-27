<template>
  <div class="pe-page">
    <template v-for="item in dataItems" :key="item.id">
      <pe-container :item="item" v-bind="item.props" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PeContainer from "./pe-container.vue";
import { Page } from "../models/page";

export default defineComponent({
  components: {
    PeContainer,
  },
  props: {
    dataItems: {
      type: Array as () => Array<Page>,
      required: true,
      default: () => [],
    },
  },
});
</script>

<style lang="scss">
.pe-page {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
