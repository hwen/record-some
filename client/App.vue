<template lang='pug'>
#app
  router-view
</template>

<script>
import { get } from './api/http'

export default{
  name: 'APP',
  created () {
    console.log('hey man...')
  }
}
</script>

<style lang="scss">
@import './styles/index';
</style>
