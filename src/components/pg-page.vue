<template>
  <div class="pg-page">
    <template v-for="item in dataPg" :key="item.id">
      <pg-container :item="item" v-bind="item.props" />
    </template>
    <pg-actions @click="actionsGeneralClickec"/>
    {{dataPg}}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PgContainer from "./pg-components/pg-container.vue";
import { ACTUAL_CONTAINER, dataPg } from "@/utils/constants.utils";
import PgActions from "./pg-actions.vue";
import { deleteItem } from "@/utils/local-storage.utils";

export default defineComponent({
  components: {
    PgContainer,
    PgActions,
  },
  setup() {
    const actionsGeneralClickec = () => {
      deleteItem(ACTUAL_CONTAINER);
    }
    return {
        dataPg,
        actionsGeneralClickec,
    }
  }
});
</script>

<style lang="scss">
.pg-page {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
