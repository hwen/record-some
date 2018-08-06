<template lang='pug'>
.main-stat-container
  AddBtn
  table(class='stat-table')
    tr
      th(
        v-for='(value, key) in thLabels'
        :key='key'
        :class='key'
      ) {{value}}
    tr(
      v-for='(item,idx) in data'
      @click="handleEdit(item._id)"
      :class='[isWeekend(item.date) ? "weekend" : ""]'
    )
      td {{item['date']}}
      td {{item['mark']}}
      td {{item['serious']}}
      td {{item['hunger']}}
      td {{item['san']}}
      td {{item['hp']}}
      td {{item['freeTime']}}
      td {{item['sleepTime']}}
      td {{item['hasSport']}}
      td {{item['hasRead']}}
      td {{item['hasKindle']}}
      td {{item['fallAsleep']}}
    tr.summary
      td {{summary['date']}}
      td {{summary['mark']}}
      td {{summary['serious']}}
      td {{summary['hunger']}}
      td {{summary['san']}}
      td {{summary['hp']}}
      td {{summary['freeTime']}}
      td {{summary['sleepTime']}}
      td {{summary['hasSport']}}
      td {{summary['hasRead']}}
      td {{summary['hasKindle']}}
      td {{summary['fallAsleep']}}
</template>
<script>
import { thLabels, ths } from './testData';
import { listSleep } from 'src/api';
import { getSummary } from 'src/utils';

import AddBtn from 'src/components/add-btn';

export default {
  name: 'home',
  components: {
    AddBtn
  },
  data() {
    return {
      thLabels: ths,
      data: [],
      summary: []
    };
  },
  async created() {
    const resp = await listSleep();
    ilog.info('list:', resp);
    if (resp.isOk) {
      this.data = resp.data;
      this.summary = getSummary(resp.data);
    }
  },
  methods: {
    handleEdit(id) {
      this.$router.push(`/detail/${id}`);
    },
    handleDetail(idx) {
      this.$router.push(`/slide/${idx}`);
    },
    isWeekend(date) {
      const day = new Date(date).getDay();
      return day === 0 || day === 6;
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
  .weekend {
    background: $light_gray;
  }
  .summary {
    background: $them_light_normal;
  }
  .sleepTime {
    background: $them_light_warn;
  }
  .fallAsleep {
    background: $them_light_info;
  }
  .hasRead {
    background: $them_light_warn;
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
