<template lang='pug'>
.detail-form
  .form-field.form-group
    label(for='') Token
    input.input-field(v-model="itoken" placeholder="Token")
  .submit
    button.btn-secondary(@click='handleSubmit') 提交
    button.btn-warning(@click='handleBack') 返回
</template>
<script>
import { sleepDetail, updateSleep, addSleep } from 'src/api';
import { formatDate } from 'src/utils';

const TOKEN_KEY = 'recordsome-token';

export default {
  name: 'token',
  data() {
    return {
      itoken: ''
    };
  },
  async created() {
    const cache = localStorage.getItem(TOKEN_KEY);
    if (cache) this.itoken = cache;
  },
  destroyed() {},
  methods: {
    handleBack() {
      this.$router.back();
    },
    async handleSubmit() {
      localStorage.setItem(TOKEN_KEY, this.itoken);
      this.$router.back();
    }
  }
};
</script>
<style lang="scss">
@import './../../styles/constants';
@import './../../styles/mixins';
.form-field {
  margin: 0.25rem auto;
  width: 90%;
  label {
    font-size: 8px;
    margin-bottom: 5px;
  }
  .input-field {
    height: 36px;
    width: 100%;
    outline: 0;
    padding-left: 0.5rem;
    font-size: 0.5rem;
  }
}
.detail-form {
  font-size: 0.5rem;
  button {
    font-size: 0.5rem;
    padding: 0.3rem;
    width: 40%;
    margin: 0 16px 16px;
  }
  .submit {
    margin-top: 16px;
    text-align: center;
  }
}
</style>
