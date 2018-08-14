<template lang='pug'>
.add-btn
  button.btn-small(@click='handleAdd')
    i.iconfont.icon-add
</template>
<script>
export default {
  name: 'AddBtn',
  components: {},
  data() {
    return {};
  },
  async created() {},
  destroyed() {},
  methods: {
    handleAdd() {
      this.$router.push('/detail');
    }
  }
};
</script>
<style lang="scss">
.add-btn {
  position: fixed;
  bottom: 16px;
  right: 66px;
  .btn-small {
    padding: 2px 10px;
    margin-bottom: 0;
  }
}
</style>
