<template>
  <div class="pg-page">
    <template v-for="item in dataPg" :key="item.id">
      <pg-container :item="item" v-bind="item.props" />
    </template>
  </div>
    
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PgContainer from "./pg-components/pg-container.vue";
import { dataPg } from "@/utils/constants.utils";
import PgActions from "./pg-actions.vue";

export default defineComponent({
  components: {
    PgContainer,
    PgActions,
  },
  setup() {
    return {
        dataPg,
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
