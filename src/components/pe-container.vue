<template>
  <draggable
    v-model="item.children"
    item-key="id"
    :disabled="!item.drag"
    class="pe-container"
    :class="{
      [row ? `style-row` : `style-column`]: true,
      'is-full': full,
      [`style-position style-${position}`]: true,
      'is-grid': columnsSize,
    }"
    :style="{ padding: padding, 'grid-template-columns': columnsSize }"
  >
    <template #item="{ element }">
      <component
        :is="getComponentName(element.componentName)"
        :item="element"
        v-bind="element.props"
      />
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import PeTextWidget from "@/widgets/pe-text-widget.vue";
import PeImageWidget from "@/widgets/pe-image-widget.vue";
import { Page } from "@/models/page";
import { getComponentName } from "../utils/util";
import draggable from "vuedraggable";
//npm i -S vuedraggable@next

type PositionType = "center" | "rigth" | "left";

export default defineComponent({
  name: "PeContainer",
  components: {
    draggable,
    PeTextWidget,
    PeImageWidget,
  },
  props: {
    item: {
      type: Page,
      required: true,
    },
    full: {
      type: Boolean,
      default: true,
    },
    row: Boolean,
    color: String,
    padding: String,
    position: {
      type: String as PropType<PositionType>,
      default: "left",
    },
    columnsSize: String,
  },
  setup() {
    const enabled = ref(false)
    return {
      getComponentName,
      enabled,
    };
  },
});
</script>

<style lang="scss" scoped>
.pe-container {
  &.style-column {
    display: flex;
    flex-direction: column;
  }
  &.style-row {
    display: flex;
    flex-direction: row;
  }
  &.is-full {
    width: 100%;
  }
  &.style-position {
    &.style-center {
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    &.style-rigth {
      align-items: end;
    }
    &.style-left {
    }
  }
  &.is-grid {
    display: grid;
  }
}
</style>
