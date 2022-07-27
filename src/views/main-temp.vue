<template>
  <div class="container">
    <builder :dataItems="dataItems" />
    <div>
      <input type="text" v-model="titulo" @input="tituloChange" @change="finishChange"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Builder from "@/components/builder.vue";
import PeContainer from "@/components/pe-container.vue";
import PePage from "@/components/pe-page.vue";
import { Page } from "@/models/page";

const dataItems = reactive<[Page]>([
  {
    id: 1,
    componentName: "div",
    props: {
      row: true,
      columnsSize: "13% 1fr 0.5fr",
    },
    children: [
      {
        id: 1,
        componentName: "img",
        props: {
          src: "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/5feec111709f4_json_image_1609482513.webp",
          shape: "circle",
          width: "100%",
        },
        children: [],
      },
      {
        id: 2,
        componentName: "div",
        props: {
          row: false,
          full: false,
          position: "center",
        },
        children: [
          {
            id: 1,
            componentName: "text",
            props: {
              text: "TITULO DEL DOCUMENTO",
              color: "blue",
              bold: true,
              size: "1.3",
              highlight: false,
            },
            children: [],
          },
          {
            id: 2,
            componentName: "text",
            props: {
              text: "Contacto: 9598457984 - 9585541512",
              size: "1.1",
            },
            children: [],
          },
          {
            id: 3,
            componentName: "text",
            props: {
              text: "empresa@demo.com",
              size: "1.1",
            },
            children: [],
          },
          {
            id: 1,
            componentName: "text",
            props: {
              text: "www.empresa.com.pe",
              size: "1.1",
            },
            children: [],
          },
        ],
      },
      {
        id: 3,
        componentName: "div",
        props: {
          full: false,
          row: false,
          position: "center",
        },
        children: [
          {
            id: 1,
            componentName: "text",
            props: {
              text: "RUC 2019109212",
              size: "1.3",
            },
            children: [],
          },
          {
            id: 2,
            componentName: "div",
            props: {
              full: false,
              row: false,
            },
            children: [
              {
                id: 1,
                componentName: "text",
                props: {
                  text: "BOLETA DE VENTA ELECTRONICA",
                  size: "1.3",
                  bold: true,
                },
                children: [],
              },
            ],
          },
          {
            id: 3,
            componentName: "text",
            props: {
              text: "B987123JKN",
              size: "1.3",
            },
            children: [],
          },
        ],
      },
    ],
  },
]);

export default defineComponent({
  components: {
    Builder,
    PeContainer,
    PePage,
  },
  setup() {
    const titulo = ref();
    const tituloChange = () => {
      dataItems[0].children![1].children![0].props!.text = titulo.value
      dataItems[0].children![1].children![0].props!.highlight = true
    }
    const finishChange = () => {
      dataItems[0].children![1].children![0].props!.highlight = false
    }
    return {
      titulo,
      tituloChange,
      finishChange,
      dataItems,
    };
  },
});
</script>

<style lang="scss">
.container {
  width: 50%;
  height: 90vh;
  background: pink;
}
</style>
