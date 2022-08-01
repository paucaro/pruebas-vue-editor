<template>
  <div
    class="pg-container"
    :class="{
      [row ? `style-row` : `style-column`]: true,
      'is-full': full,
      [`style-position style-${position}`]: true,
      'is-grid': columnsSize,
    }"
    :style="{ 
        padding: padding, 
        'grid-template-columns': columnsSize,
        background: color, 
    }"
    @click="getActions"
  >
    <template v-for="element in item.children" :key="element">
      <component
        :is="getComponentPgName(element.componentName)"
        :item="element"
        v-bind="element.props"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import PeTextWidget from "@/widgets/pe-text-widget.vue";
import PeImageWidget from "@/widgets/pe-image-widget.vue";
import { Page } from "@/models/page";
import { getComponentPgName } from "../../utils/constants.utils";

type PositionType = "center" | "rigth" | "left";

export default defineComponent({
  name: "PgContainer",
  components: {
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
  setup(props) {
    const enabled = ref(false);
    const getActions = () => {
        console.log(props.item)
    }
    return {
      getComponentPgName,
      enabled,
      getActions,
    };
  },
});
</script>

<style lang="scss" scoped>
.pg-container {
    min-height: 40px;
    cursor: pointer;
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
