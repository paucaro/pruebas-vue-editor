<template>
<div class="pg-builder">
    <div class="container-builder-page">
      <div class="container-style-page">
        <div class="style-builder" :class="`style-${sizeType}`">
          <pg-page />
        </div>
      </div>
    </div>
    <div>
    <pg-actions @click="actionsGeneralClickec"/>
        <!-- {{dataPg}} -->
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PgPage from "./pg-page.vue";
import { dataPg } from "@/utils/constants.utils";
import PgActions from "./pg-actions.vue";

type SizeType = "a4" | "a5" | "ticket";

export default defineComponent({
  components: {
    PgPage,
    PgActions,
  },
  props: {
    sizeType: {
      type: String as PropType<SizeType>,
      default: "a4",
      required: false,
    },
  },
  setup() {
    const actionsGeneralClickec = () => {
      
    }
    return {
        dataPg,
        actionsGeneralClickec,
    }
  }
});
</script>

<style lang="scss">
.pg-builder {
    display: flex;

    .container-builder-page {
      height: 100%;
      overflow: auto;
      flex-grow: 1;
      background: lightgray;
    
      .container-style-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 5px;
    
        .style-builder {
          position: relative;
          border: 1px dotted;
    
          &.style-a4 {
            width: 90%;
            padding-top: 131.42%;
            background: white;
          }
    
          &.style-a5 {
            width: 67%;
            padding-top: 90%;
            background: white;
          }
    
          &.style-ticket {
            width: 35%;
            padding-top: 90%;
            background: white;
          }
        }
      }
    }

}
</style>
