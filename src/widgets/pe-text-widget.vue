<template>
<div :class="[
      highlight? `item-highlight`: ``
      ]">
  <div
    class="pe-text-widget"
    :class="[
      bold? `is-bold`: ``
      ]"
    :style="{ 'font-size': size + 'vw', 'color': color }"
  >
    {{text}}
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    text: String,
    bold: Boolean,
    size: Number,
    color: String,
    highlight: {
      type: Boolean,
      default: false
    },
  }
});
</script>

<style lang="scss">
.pe-text-widget {
  &.is-bold {
    font-weight: bold;
  }

}
  .item-highlight {
  border: 1px solid red;
}
</style>