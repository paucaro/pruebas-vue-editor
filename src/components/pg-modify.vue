<template>
  <div class="pg-modify">
    <div class="button-modify" @click="selectComponent">* Modify</div>
    <transition name="fade">
      <div class="props-new-component" v-if="showComponentProps">
        <div class="title">{{ componentSelected.named }}</div>
        <div class="props-listed">
          <div
            class="props-item"
            v-for="(prop, index) in componentSelected.props"
            :key="prop"
          >
            <div class="label">{{ prop }}</div>
            <input class="value" type="text" v-model="modelProps[index]" />
          </div>
        </div>
        <div class="actions">
          <button class="button cancel" @click="cancelComponent">
            CANCEL
          </button>
          <button class="button create" @click="saveComponent">MODIFY</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  ACTUAL_CONTAINER,
  getComponentPgName,
  getNewComponent,
  getPropsActual,
  PgPage,
  searchIndexAndModifyPropsComp,
} from "@/utils/constants.utils";
import { defineComponent, ref } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    const componentSelected = ref();
    const modelProps = ref<string[]>([]);
    const showComponentProps = ref(false);

    const selectComponent = () => {
      if (!!ACTUAL_CONTAINER.value) {
        showComponentProps.value = true;
        componentSelected.value = getNewComponent(
          getComponentPgName(ACTUAL_CONTAINER.value.split("_").pop()!)
        );
        import(
          `@/components/pg-components/${componentSelected.value.name}.vue`
        ).then((val) => {
          componentSelected.value.props = Object.keys(val.default.props);
          let propsActual = getPropsActual();
          componentSelected.value.props.forEach((p: string, index: number) => {
            if (!!propsActual[p]) {
              modelProps.value[index] = propsActual[p];
            }
          });
        });
      }
    };

    const saveComponent = () => {
      let propsCreate: { [key: string]: any } = {};
      componentSelected.value.props.forEach((item: string, index: number) => {
        if (modelProps.value[index]) {
          propsCreate[item] = modelProps.value[index];
        }
      });

      searchIndexAndModifyPropsComp(propsCreate);
      modelProps.value = [];
      showComponentProps.value = false;
      ACTUAL_CONTAINER.value = "";
    };

    const cancelComponent = () => {
      modelProps.value = [];
      showComponentProps.value = false;
      ACTUAL_CONTAINER.value = "";
    }

    return {
      componentSelected,
      showComponentProps,
      selectComponent,
      modelProps,
      saveComponent,
      cancelComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
.pg-modify {
  .button-modify {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    border: 2px dashed black;
    padding: 10px;
    user-select: none;
    cursor: pointer;
  }

  .props-new-component {
    width: 300px;
    border: 1px solid #141e30;
    .title {
      font-weight: bold;
      text-align: center;
      padding: 10px;
      background: linear-gradient(to right, #141e30, #243b55);
      color: white;
    }
    .props-listed {
      margin: 10px;
      .props-item {
        display: flex;
        color: #141e30;
        .label {
          font-style: italic;
          flex-grow: 1;
          display: flex;
          align-items: center;
        }
        .value {
          margin: 6px;
          flex-grow: 0;
          border: 1px solid #243b55;
        }
      }
    }

    .actions {
      display: flex;
      gap: 8px;
      margin: 8px;

      .button {
        padding: 10px;
        color: white;
        font-size: 16px;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        flex-grow: 1;
      }

      .cancel {
        background: rgb(123, 38, 38);
      }
      .create {
        background: rgb(40, 70, 40);
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
