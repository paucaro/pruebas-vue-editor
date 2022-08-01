<template>
  <div id="app">
    <!-- <QuillEditor 
        v-model:content="content"
        contentType="html"
        :options="options"
    />
    <button @click="cli">clic</button> -->
    <!-- <pg-add/> -->
    <pg-page />
  </div>
</template>

<script lang="ts">
import {ref} from 'vue';
import PgAdd from '../components/pg-add.vue';
import PgPage from '../components/pg-page.vue';
export default {
  components: {
    PgAdd,
    PgPage,
  },
  setup() {
    const content =  ref("<h1>Some initial content</h1>")
    const cli = () => {
      console.log(content.value)
    }
    return {
      content,
      cli,
      options: {
        debug: 'info',
        modules: {
          toolbar: ['bold', 'italic', 'underline']
        },
        readOnly: false,
        theme: 'snow'
      }
    };
  }
};
</script>