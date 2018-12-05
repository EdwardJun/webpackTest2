<style lang="sass">
  @import './sass/test.scss';
</style>

<template>
  <div id="aaa">
    <!-- HAHAHA--------
    <div class="wrap">
      <span>左边</span>
      <span>右边sssss</span>
    </div>
    <div class="pic"></div>
    <div class="pic2" style="background-image: url(../static/images/cssFilter1.png)"></div>
    <img class="pic2" src="../static/images/cssFilter1.png" />
    <router-link to="/home" tag="button">跳转home</router-link> -->
    <router-view/>
  </div>
</template>

<script>
  import Global from './libs/global.js'

  export default {
    data () {
      return {
        test: 'dd',
        global: Global.data
      }
    },
    created () {
      let g = Global
      g.doTest()
      console.log('hahahaha~~~~~~~~~~~')
    }
  }
</script>
