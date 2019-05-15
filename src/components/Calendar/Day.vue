<template>
  <td
    class="day"
    :class="{
      active: isActive,
      select: isSelect,
      'current-date': isCurrentDate
    }"
  >
    <div>
        {{ date }}
    </div>
  </td>
</template>

<script>
export default {
  name: "Day",
  components: {},
  props: {
    dateMonth: {
      type: Date,
      required: true
    },
    date: {
      type: Number,
      required: true
    }
  },
  computed: {
    dateIn() {
      return this.$parent.$parent.dateIn;
    },
    dateOut() {
      return this.$parent.$parent.dateOut;
    },
    dateSingle() {
      return this.$parent.$parent.dateSingle;
    },
    timeCurrentDay() {
      return new Date(
        this.dateMonth.getFullYear(),
        this.dateMonth.getMonth(),
        this.date
      );
    },
    isActive() {
      // Если выбрана левая часть
      let isLeft =
        this.dateIn &&
        this.timeCurrentDay.getFullYear() == this.dateIn.getFullYear() &&
        this.timeCurrentDay.getMonth() == this.dateIn.getMonth() &&
        this.timeCurrentDay.getDate() == this.dateIn.getDate();
      // Если выбрана как правая часть
      let isRight =
        this.dateOut &&
        this.timeCurrentDay.getFullYear() == this.dateOut.getFullYear() &&
        this.timeCurrentDay.getMonth() == this.dateOut.getMonth() &&
        this.timeCurrentDay.getDate() == this.dateOut.getDate();
      let isSingle =
        this.dateSingle &&
        this.timeCurrentDay.getFullYear() == this.dateSingle.getFullYear() &&
        this.timeCurrentDay.getMonth() == this.dateSingle.getMonth() &&
        this.timeCurrentDay.getDate() == this.dateSingle.getDate();
      return isLeft || isRight || isSingle;
    },
    isSelect() {
      //  Если дата правее выбраной левой части
      let isLeft =
        this.dateIn && this.timeCurrentDay.getTime() >= this.dateIn.getTime();
      // Если дата левее выбраной правой части
      let isRight =
        this.dateOut && this.timeCurrentDay.getTime() < this.dateOut.getTime();
      return isLeft && isRight;
    },
    isCurrentDate() {
      let toDay = new Date();
      return (
        this.timeCurrentDay.getFullYear() == toDay.getFullYear() &&
        this.timeCurrentDay.getMonth() == toDay.getMonth() &&
        this.timeCurrentDay.getDate() == toDay.getDate()
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.day {
  box-sizing: border-box;
  vertical-align: middle;
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
        border: 1px solid #D8D8D8;
        background: #fff;
        width: 41px;
        height: 41px;
        padding: 4px 4px 0 0;
        margin: 0 -1px -1px 0;
    }
  &.disabled {
    pointer-events: none;
    opacity: 0.25;
  }
  &.current-date {
      > div {
          color: #2d6cb4;
      }
  }
}
</style>
