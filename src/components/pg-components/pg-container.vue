<template>
  <div>
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
      @click.stop="getActions"
    >
      <template v-for="element in item.children" :key="element">
        <component
          :is="getComponentPgName(element.componentName)"
          :item="element"
          v-bind="element.props"
        />
      </template>
    </div>
    <pg-actions v-if="showActions"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import PgActions from "../pg-actions.vue";
import {
  ACTUAL_CONTAINER,
  getComponentPgName,
  PgPage,
} from "../../utils/constants.utils";
import { saveItem } from "../../utils/local-storage.utils";

type PositionType = "center" | "rigth" | "left";

export default defineComponent({
  name: "PgContainer",
  components: {
    PgActions
  },
  props: {
    item: {
      type: PgPage,
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
    const showActions = ref(false);
    const getActions = () => {
      saveItem(ACTUAL_CONTAINER, props.item.id);
      showActions.value = !showActions.value;
    };
    return {
      getComponentPgName,
      enabled,
      showActions,
      getActions,
    };
  },
});
</script>

<style lang="scss" scoped>
.pg-container {
  min-height: 40px;
  padding: 4px;
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
