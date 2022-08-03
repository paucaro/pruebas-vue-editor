<template>
  <div 
    class="pg-image-widget image-widget-wrapper"
    :style="{'width': width}"
  >
    <img 
      :src="src" 
      class="img-styles"
      :class="`shape-${shape}`" 
      alt=""
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"

type ShapeType = "rect" | "circle";

export default defineComponent({
    props: {
        src: {
            type: String,
            required: true
        },
        shape: {
          type: String as PropType<ShapeType>,
          default: "rect"
        },
        width: String,
    },

})
</script>

<style lang="scss">
.pg-image-widget {
  &.image-widget-wrapper {
    .img-styles{
      width: 100%;
      &.shape-circle {
        border-radius: 50%
      }
    }
  }
}
</style>