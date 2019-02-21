<style lang="sass">
</style>

<template>
  <div id="other">
    {{test}}
    <router-view/>
  </div>
</template>

<script>
  // import Global from '@/libs/global.js'

  export default {
    data () {
      return {
        test: 'other.vue'
        // global: Global.data
      }
    },
    created () {
      // let g = Global
      // g.doTest()
      console.log('other.vue~~~~~~~~~~~')
    }
  }
</script>
