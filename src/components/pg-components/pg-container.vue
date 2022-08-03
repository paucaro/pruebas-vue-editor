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
        margin: margin,
        'grid-template-columns': columnsSize,
        background: color,
      }"
      @click.stop="getActions(item.id)"
    >
      <template v-for="element in item.children" :key="element">
        <component
          :is="getComponentPgName(element.componentName)"
          :item="element"
          v-bind="element.props"
          @click.stop="getActions(element.id)"
        />
      </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import {
  ACTUAL_CONTAINER,
  getComponentPgName,
  PgPage,
} from "../../utils/constants.utils";
import PgImage from "./pg-image.vue";
import { getItem, saveItem } from "../../utils/local-storage.utils";

type PositionType = "center" | "rigth" | "left";

export default defineComponent({
  name: "PgContainer",
  components: {
    PgImage,
  },
  props: {
    item: {
      type: PgPage,
      required: true,
    },
    full: {
      type: Boolean,
      default: false,
    },
    row: Boolean,
    color: String,
    padding: String,
    margin: String,
    position: {
      type: String as PropType<PositionType>,
      default: "left",
    },
    columnsSize: String,
  },
  setup(props) {
    const enabled = ref(false);
    const getActions = (id: string) => {
      ACTUAL_CONTAINER.value = id;
    };
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

  &:hover {
    border: 1px dashed;
  }
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
