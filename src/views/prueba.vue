<template>
  <div id="app">
    <!-- <QuillEditor 
        v-model:content="content"
        contentType="html"
        :options="options"
    />
    <button @click="cli">clic</button> -->
    <!-- <pg-add/> -->
    <pg-builder/>
  </div>
</template>

<script lang="ts">
import {ref} from 'vue';
import PgPage from '../components/pg-page.vue';
import PgBuilder from '@/components/pg-builder.vue';
export default {
  components: {
    PgPage,
    PgBuilder
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