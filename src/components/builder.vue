<template>
  <div class="container-builder-page">
    <div class="container-style-page">
      <div class="style-builder" :class="`style-${sizeType}`">
        <pe-page :dataItems="dataItems" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Page } from "@/models/page";
import { defineComponent, PropType } from "vue";
import PePage from "./pe-page.vue";

type SizeType = "a4" | "a5" | "ticket";

export default defineComponent({
  components: {
    PePage,
  },
  props: {
    sizeType: {
      type: String as PropType<SizeType>,
      default: "a4",
      required: false,
    },
    dataItems: {
      type: Array as () => Array<Page>,
      default: () => [],
      required: true,
    },
  },
});
</script>

<style lang="scss">
.container-builder-page {
  height: 100%;
  overflow: auto;

  .container-style-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5px;

    .style-builder {
      position: relative;

      &.style-a4 {
        width: 90%;
        padding-top: 131.42%;
        background: white;
      }

      &.style-a5 {
        width: 67%;
        padding-top: 90%;
        background: white;
      }

      &.style-ticket {
        width: 35%;
        padding-top: 90%;
        background: white;
      }
    }
  }
}
</style>
