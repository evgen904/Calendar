<template>
  <div class="calendar-wr" :class="{month:typeCalendar=='month'}">
    <template v-for="date in dateMonth">
      <Month :dateMonth="date" :lang="lang" />
    </template>
  </div>
</template>

<script>
import Month from "./Month";

export default {
  name: "Calendar",
  components: {
    Month
  },
  computed: {
    dateMonth() {
      return [...Array(this.countMonth).keys()].map(
        month =>
          new Date(
            this.beginDate.getFullYear(),
            this.beginDate.getMonth() + month,
            1
          )
      );
    }
  },
  props: {
    type: {
      default: "range",
      type: String,
      validator(value) {
        return ["single", "range"].includes(value);
      }
    },
    lang: {
      default: "ru-RU",
      type: String,
      validator(value) {
        return ["ru-RU", "en-US"].includes(value);
      }
    },
    beginDate: {
      type: Date,
      require: true
    },
    countMonth: {
      default: 1,
      type: Number
    },
    orientation: {
      default: "horizontal",
      type: String,
      validator(value) {
        return ["vertical", "horizontal"].includes(value);
      }
    },
    changeRange: {
      default: null,
      validator(value) {
        return [null, "in", "out"].includes(value);
      }
    },
      typeCalendar: {
          type: String
      }
  }
};
</script>

<style lang="scss" scoped>
.calendar-wr {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  &.month {
    max-width: 672px;
    /deep/ .month-title {
      display: none;
    }
    /deep/ .day > div {
      width: 96px;
      height: 96px;
    }
    /deep/ table tr {
      td.another-month {
        border-collapse: collapse;
        border-spacing: 0;
        padding: 0;
        margin: 0;
        > div {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          font-size: 14px;
          color: #444444;
          border: 1px solid #d8d8d8;
          background: transparent;
          width: 96px;
          height: 96px;
          padding: 4px 4px 0 0;
          margin: 0 -1px -1px 0;
        }
      }
      th {
        font-size: 16px;
        padding-bottom: 2px;
        &:nth-child(6),
        &:nth-child(7) {
          color: #444;
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
