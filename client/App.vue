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

<style lang="stylus">
@import './styles/index'
.detail-page.form-container
  margin: 24px 16px
  width: 80%
</style>
