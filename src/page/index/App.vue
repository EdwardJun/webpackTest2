<style lang="sass">
</style>

<template>
  <div id="app">
    {{test}}
    <router-view/>
  </div>
</template>

<script>
  // import Global from '@/libs/global.js'

  export default {
    data () {
      return {
        test: 'App.vue'
        // global: Global.data
      }
    },
    created () {
      // let g = Global
      // g.doTest()
      console.log('app.vue~~~~~~~~~~~')
    }
  }
</script>
