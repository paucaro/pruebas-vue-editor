<template>
  <div class="pg-delete">
    <div class="button-delete" @click="deleteComponent">
        - Delete
    </div>
  </div>
</template>

<script lang="ts">
import { searchIndexAndDeleteComp } from "@/utils/constants.utils";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    const deleteComponent = () => {
      searchIndexAndDeleteComp();
    }
    return {
      deleteComponent,
    }
  }
});
</script>

<style lang="scss" scoped>
.pg-delete {
    .button-delete {
        text-align: center;
    font-size: 25px;
    font-weight: bold;
    border: 2px dashed black;
    padding: 10px;
    user-select: none;
    cursor: pointer;
    }
}
</style>