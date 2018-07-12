<template lang='pug'>
.detail-form
  .form-field
    input.input-field(v-model="form.date" placeholder="日期")
  .form-field
    input.input-field(v-model="form.mark" placeholder="索引")
  .form-field
    input.input-field(v-model="form.serious" placeholder="认真程度")
  .form-field
    input.input-field(v-model="form.hunger" placeholder="饱腹度")
  .form-field
    input.input-field(v-model="form.san" placeholder="san值")
  .form-field
    input.input-field(v-model="form.hp" placeholder="疲劳度")
  .form-field
    input.input-field(v-model="form.freeTime" placeholder="空闲时间")
  .form-field
    input.input-field(v-model="form.sleepTime" placeholder="睡觉时间")
  .form-field
    input.input-field(v-model="form.hasImportantThing" placeholder="是否有重要之事")
  .form-field
    input.input-field(v-model="form.hasSport" placeholder="是否有运动")
  .form-field
    input.input-field(v-model="form.hasRead" placeholder="是否有看书")
  .form-field
    input.input-field(v-model="form.hasKindle" placeholder="是否看kindle")
  .form-field
    input.input-field(v-model="form.fallAsleep" placeholder="容易入睡")
  .submit
    .btn.submit-btn(@click='handleSubmit') 提交
    .btn.back-btn(@click='handleBack') 返回
</template>
<script>
import { sleepDetail, updateSleep, addSleep } from 'src/api';
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
      Object.assign(this.form, resp);
    }
  },
  destroyed() {},
  methods: {
    handleBack() {
      this.$router.back();
    },
    handleSubmit() {
      const { id } = this.$route.params;
      if (!id) {
        addSleep(this.form);
      } else {
        updateSleep(this.form);
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
    height: 28px;
    width: 100%;
  }
}
.detail-form {
  .btn {
    @include btn();
  }
  .back-btn {
    background: $orange;
  }
}
</style>
