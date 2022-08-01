<template>
  <pg-add/>
  <pg-delete/>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import PgAdd from "./pg-add.vue";
import PgDelete from "./pg-delete.vue";

export default defineComponent({
    components: {
        PgAdd,
        PgDelete,
    }

});
</script>

<style lang="scss" scoped>

</style>