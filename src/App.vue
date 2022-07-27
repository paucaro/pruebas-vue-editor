<template>
  <!-- <main-temp/> -->
  <prueba />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainTemp from './views/main-temp.vue';
import Prueba from './views/prueba.vue';

@Options({
  components: {
    MainTemp,
    Prueba,
  },
})
export default class App extends Vue {}
</script>

<style>
</style>
