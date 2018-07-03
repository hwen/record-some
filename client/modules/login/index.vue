<template lang='pug'>
.login-container
  | HI Man
</template>
<script>
export default {
  name: 'login',
  components: {
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
  },
  created () {
  },
  destroyed () {
  }
}
</script>
<style lang="stylus">
// 参考：https://github.com/shama/stylus-loader/issues/160
@import '~src/styles/constants.styl'
.login-container
  height: 100vh
  background-color: $light_purple
</style>
