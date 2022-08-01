<template>
  <div class="pg-add">
    <div class="boton-add" @click="showComponentsList = !showComponentsList">
      + Add
    </div>
    <div class="add-section">
      <transition name="fade">
        <div class="components-add" v-if="showComponentsList">
          <template v-for="comp in list" :key="comp">
            <div class="component-style" @click="selectComponent(comp)">
              <div class="title">{{ comp.named }}</div>
              <div class="contenido-html" v-html="comp.html" />
            </div>
          </template>
        </div>
      </transition>
      <transition name="fade">
        <div class="props-new-component" v-if="showComponentProps && showComponentsList">
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
            <button class="button cancel" @click="showComponentProps = false">
              CANCEL
            </button>
            <button class="button create" @click="saveComponent">CREATE</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getListNewComponents, dataPg, ACTUAL_CONTAINER, searchIndexAndPushComp, PgPage } from "../utils/constants.utils";
import { deleteItem, getItem } from "@/utils/local-storage.utils";

export default defineComponent({
  setup() {
    const list = ref(getListNewComponents());
    const showComponentsList = ref(false);
    const showComponentProps = ref(false);

    const componentSelected = ref();
    const modelProps = ref([])

    const selectComponent = (comp: any) => {
      showComponentProps.value = true;
      componentSelected.value = comp;
      import(
        `@/components/pg-components/${componentSelected.value.name}.vue`
      ).then(
        (val) =>
          (componentSelected.value.props = Object.keys(val.default.props))
      );
    };

    const saveComponent = () => {
      let propsCreate: { [key: string]: any } = {};
      componentSelected.value.props.forEach((item: string, index: number) => {
        if ( modelProps.value[index]) {
          propsCreate[item] = modelProps.value[index];
        }
      });

      
      const newComp: PgPage = {
        id: `${componentSelected.value.named}`,
        componentName: componentSelected.value.named,
        props: propsCreate,
        children: []
      }
      searchIndexAndPushComp(newComp);
      modelProps.value = [];
      showComponentProps.value = false;
      deleteItem(ACTUAL_CONTAINER);
    };

    return {
      list,
      showComponentsList,
      showComponentProps,
      componentSelected,
      modelProps,
      selectComponent,
      saveComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
.pg-add {
  .boton-add {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    border: 2px dashed black;
    padding: 10px;
    user-select: none;
    cursor: pointer;
  }

  .add-section {
    display: flex;

    .components-add {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 10px;
      flex-grow: 1;

      .component-style {
        height: 200px;
        width: 200px;
        border: 1px dotted;
        display: flex;
        flex-direction: column;
        cursor: pointer;

        .title {
          font-weight: bold;
          text-align: center;
          padding: 10px;
          background: linear-gradient(to right, #141e30, #243b55);
          color: white;
        }

        .contenido-html {
          flex-grow: 1;
        }
      }
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
