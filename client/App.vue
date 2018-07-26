<template lang='pug'>
#app
  router-view
</template>

<script>
export default {
  name: 'APP',
  mounted() {
    ilog('Hey~~', 'force');
  }
};
</script>

<style lang="scss">
@import './styles/index';
@import './styles/iconfont';

body {
  font-size: 0.75rem;
}
#app {
  height: 100vh;
}
</style>
