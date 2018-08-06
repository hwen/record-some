<template lang='pug'>
.detail-form
  .form-field.form-group
    label(for='') 日期
    input.input-field(v-model="form.date" placeholder="日期")
  .form-field.form-group
    label(for='') 索引
    input.input-field(v-model="form.mark" placeholder="索引")
  .form-field.form-group
    label(for='') 认真
    input.input-field(v-model="form.serious" type='number' placeholder="认真程度 | 较差1,一般2,较好3,良好4")
  .form-field.form-group
    label(for='') 饱腹
    input.input-field(v-model="form.hunger" type='number' placeholder="饱腹度 | 较饿1,一般2,较饱3,很饱4")
  .form-field.form-group
    label(for='') san
    input.input-field(v-model="form.san" type='number' placeholder="san值 | 较低1,一般2,较好3,良好4")
  .form-field.form-group
    label(for='') 疲劳
    input.input-field(v-model="form.hp" type='number' placeholder="疲劳度 | 较累1,一般2,较好3,良好4")
  .form-field.form-group
    label(for='') 空闲
    input.input-field(v-model="form.freeTime" type='number' placeholder="空闲时间")
  .form-field.form-group
    label(for='') 睡时
    input.input-field(v-model="form.sleepTime" placeholder="睡觉时间")
  .form-field.form-group
    label(for='') 容易入睡
    input.input-field(v-model="form.fallAsleep" placeholder="容易入睡")
  fieldset.form-field.form-group
    label.paper-radio(for='hasSport')
      input(type='checkbox' id='hasSport' :checked='form.hasSport == 1' :value='form.hasSport' @change='handleCheck("hasSport")')
      span 是否有运动
    label.paper-radio(for='hasRead')
      input(type='checkbox' id='hasRead' :checked='form.hasRead == 1' :value='form.hasRead' @change='handleCheck("hasRead")')
      span 是否有看书
    label.paper-radio(for='hasKindle')
      input(type='checkbox' id='hasKindle' :checked='form.hasKindle == 1' :value='form.hasKindle' @change='handleCheck("hasKindle")')
      span 是否看kindle
  .submit
    button.btn-secondary(@click='handleSubmit') 提交
    button.btn-warning(@click='handleBack') 返回
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
        authorName: '',
        date: '',
        mark: '',
        serious: '',
        hunger: '',
        san: '',
        hp: '',
        freeTime: '',
        sleepTime: '',
        hasImportantThing: '0',
        hasSport: '0',
        hasRead: '0',
        hasKindle: '0',
        fallAsleep: '容易'
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
    handleCheck(type) {
      this.form[type] = this.form[type] == 1 ? '0' : '1';
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
  .paper-radio {
    span {
      &::before {
        height: 0.7rem !important;
        width: 0.7rem !important;
      }
    }
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
