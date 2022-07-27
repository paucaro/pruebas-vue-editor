<template>
  <div id="app">
    <QuillEditor 
        v-model:content="content"
        contentType="html"
        :options="options"
    />
  </div>
</template>

<script>
export default {
  components: {
  },

  data() {
    return {
      content: "<h1>Some initial content</h1>",
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