<template lang='pug'>
.main-stat-container
  .header
    .add-btn(@click='handleAdd') 添加
  table(class='stat-table')
    tr
      th(
        v-for='(value, key) in thLabels'
        :key='key'
        :class='key'
      ) {{value}}
    tr(
      v-for='(item,idx) in data'
      @click="handleDetail(idx)"
    )
      td {{item['date']}}
      td {{item['mark']}}
      td {{item['serious']}}
      td {{item['hunger']}}
      td {{item['san']}}
      td {{item['hp']}}
      td {{item['freeTime']}}
      td {{item['sleepTime']}}
      td {{item['hasImportantThing']}}
      td {{item['hasSport']}}
      td {{item['hasRead']}}
      td {{item['hasKindle']}}
      td {{item['fallAsleep']}}
</template>
<script>
import { thLabels } from './testData';
import { listSleep } from 'src/api';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      thLabels: thLabels,
      data: []
    };
  },
  async created() {
    const resp = await listSleep();
    ilog(resp);
    this.data = resp;
  },
  methods: {
    handleAdd() {
      this.$router.push('/detail');
    },
    handleEdit(id) {
      this.$router.push(`/detail/${id}`);
    },
    handleDetail(idx) {
      this.$router.push(`/slide/${idx}`);
    }
  }
};
</script>
<style lang="scss">
@import './../../styles/constants';
@import './../../styles/mixins';
.header {
  .add-btn {
    @include btn();
    background: $purple;
  }
}
.stat-table {
  // border: 1px solid $light_purple;
  border-collapse: collapse;
  margin: auto;
  font-size: 12px;
  tr {
  }
  .sleepTime {
    background: $them_light_warn;
  }
  .fallAsleep {
    background: $them_light_info;
  }
  th,
  td {
    min-height: 30px;
    padding: 5px;
    text-align: center;
    border: 1px solid $light_purple;
    border-collapse: collapse;
  }
}
</style>
