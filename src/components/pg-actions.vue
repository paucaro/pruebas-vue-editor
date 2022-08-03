<template>
  <div class="pg-actions">
    <div class="info-selected">
      <div class="actual-container">
        {{ACTUAL_CONTAINER}}
      </div>
      <button class="delete-seleccion" @click="deleteSelection">
        Remove Selection
      </button>
    </div>
    <pg-add/>
    <pg-delete/>
    <pg-modify/>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from "vue";
import PgAdd from "./pg-add.vue";
import PgDelete from "./pg-delete.vue";
import PgModify from "./pg-modify.vue";
import { ACTUAL_CONTAINER } from "@/utils/constants.utils";

export default defineComponent({
    components: {
        PgAdd,
        PgDelete,
        PgModify,
    },
    setup() {
      const deleteSelection = () => {
        ACTUAL_CONTAINER.value = '';
      }
      return {
        ACTUAL_CONTAINER,
        deleteSelection
      }
    }
});
</script>

<style lang="scss" scoped>
.pg-actions {
  width: 550px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 15px;

.info-selected {
  display: flex;
  align-items: center;
  .actual-container {
    flex-grow: 1;
    font-style: italic;
  }
  .delete-seleccion {
    padding: 10px;
    color: white;
    background: #243b55;
    font-weight: bold;
    border-radius: 10px;
    border: none;
  }
}
}
</style>