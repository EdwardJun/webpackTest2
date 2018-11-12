<template>
  <div id="app">
    HAHAHA--------
    <div class="wrap">
      <span>左边</span>
      <span>右边</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        test: 'dd'
      }
    },
    created () {
      console.log('hahahaha~~~~~~~~~~~')
    }
  }
</script>

<style lang="sass">
  @import './sass/test.scss';
</style>
