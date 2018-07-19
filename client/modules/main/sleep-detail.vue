<template lang='pug'>
.detail-form
  .form-field
    input.input-field(v-model="form.date" placeholder="日期")
  .form-field
    input.input-field(v-model="form.mark" placeholder="索引")
  .form-field
    input.input-field(v-model="form.serious" type='number' placeholder="认真程度")
  .form-field
    input.input-field(v-model="form.hunger" type='number' placeholder="饱腹度")
  .form-field
    input.input-field(v-model="form.san" type='number' placeholder="san值")
  .form-field
    input.input-field(v-model="form.hp" type='number' placeholder="疲劳度")
  .form-field
    input.input-field(v-model="form.freeTime" type='number' placeholder="空闲时间")
  .form-field
    input.input-field(v-model="form.sleepTime" placeholder="睡觉时间")
  .form-field
    p-check.p-icon.p-round.p-jelly(color='primary' true-value='1' false-value='0' v-model="form.hasImportantThing")
      | 是否有重要之事
  .form-field
    p-check.p-icon.p-round.p-jelly(color='primary' true-value='1' false-value='0' v-model="form.hasSport")
      | 是否有运动
  .form-field
    p-check.p-icon.p-round.p-jelly(color='primary' true-value='1' false-value='0' v-model="form.hasRead")
      | 是否有看书
  .form-field
    p-check.p-icon.p-round.p-jelly(color='primary' true-value='1' false-value='0' v-model="form.hasKindle")
      | 是否看kindle
  .form-field
    input.input-field(v-model="form.fallAsleep" placeholder="容易入睡")
  .submit
    .btn.submit-btn(@click='handleSubmit') 提交
    .btn.back-btn(@click='handleBack') 返回
</template>
<script>
import { sleepDetail, updateSleep, addSleep } from 'src/api';
import { formatDate } from 'src/utils';

export default {
  name: 'detail',
  components: {},
  data() {
    return {
      form: {
        author_name: '',
        date: '',
        mark: '',
        serious: '',
        hunger: '',
        san: '',
        hp: '',
        freeTime: '',
        sleepTime: '',
        hasImportantThing: '',
        hasSport: '',
        hasRead: '',
        hasKindle: '',
        fallAsleep: ''
      }
    };
  },
  async created() {
    const { id } = this.$route.params;
    if (id) {
      const resp = await sleepDetail(id);
      ilog('==== detail ====');
      ilog(resp);
      Object.assign(this.form, resp.data);
    }
    ilog(this.form);
    if (!this.form.date) {
      ilog('update date');
      this.form.date = formatDate('YYYY-MM-DD');
    }
  },
  destroyed() {},
  methods: {
    handleBack() {
      this.$router.back();
    },
    async handleSubmit() {
      const { id } = this.$route.params;
      let resp = null;
      if (!id) {
        resp = await addSleep(this.form);
      } else {
        resp = await updateSleep(this.form);
      }
      if (resp.isOk) {
        this.$router.push('/');
      }
    }
  }
};
</script>
<style lang="scss">
@import './../../styles/constants';
@import './../../styles/mixins';
.form-field {
  margin: 16px;
  width: 90%;
  .input-field {
    height: 36px;
    width: 100%;
    outline: 0;
    padding-left: 16px;
    // border: none;
  }
}
.detail-form {
  font-size: 18px;
  .btn {
    @include btn();
  }
  .back-btn {
    background: $orange;
  }
}
</style>
