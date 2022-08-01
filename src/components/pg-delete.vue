<template>
  <div class="pg-delete">
    <div class="button-delete">
        - Delete
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
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