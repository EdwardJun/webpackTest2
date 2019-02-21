<style>
</style>
<template>
  <div id="other1-page">
    other1111111111
    <router-link :to="{path: '/other2'}" tag="button">跳转other2</router-link>
    <button @click="toIndex()">跳转index</button>
  </div>
</template>
<script>
export default {
    data () {
      return {

      }
    },
    created () {},
    methods: {
      toIndex () {
        console.log(location)
        console.log(location.origin + '/index.html')
        window.location.href = location.origin + '/index.html'
      }
    }
}
</script>
