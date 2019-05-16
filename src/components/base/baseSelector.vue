<template>
  <div
    class="selector"
    @click="visible = !visible"
    v-click-outside="clickOutside"
  >
    <span v-if="typeSelect == 'month'">{{
      dates[selected].toLocaleString("ru-RU", { month: "long" })
    }}</span>
    {{ dates[selected].getFullYear() }}

    <ul class="selector-list" v-if="visible">
      <li
        class="selector-list-elem"
        :class="{ 'selector-list-elem__active': selected == index }"
        v-for="(date, index) in dates"
        :key="index"
        @click="value = index"
      >
        <span v-if="typeSelect == 'month'">{{
          date.toLocaleString("ru-RU", { month: "long" })
        }}</span>
        {{ date.getFullYear() }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Selector",
  props: {
    typeSelect: {
      default: "month",
      type: String
    }
  },
  computed: {
    ...mapState(["beginDate"]),
    selected() {
      return this.dates.findIndex(date => {
        return (
          date.getFullYear() == this.beginDate.getFullYear() &&
          (this.typeSelect == "year" ||
            date.getMonth() == this.beginDate.getMonth())
        );
      });
    },
    dates() {
      let dates;
      if (this.typeSelect == "month") {
        dates = [...Array(24).keys()].map(
          month => new Date(new Date().getFullYear(), 0 + month, 1)
        );
      } else if (this.typeSelect == "year") {
        dates = [...Array(2).keys()].map(
          year => new Date(new Date().getFullYear() + year, 0, 1)
        );
      }
      return dates;
    }
  },
  watch: {
    value() {
      if (!this.lock) {
        this.setDateBy(this.dates[this.value]);
        this.$emit("input", this.dates[this.value]);
        this.date = this.dates[this.value];
      }
    },
    async selected(value) {
      this.lock = true;
      this.value = value;
      await this.$nextTick();
      this.lock = false;
    },
    "$attrs.value": function(value) {
      this.value = value;
    },
    typeSelect(val) {
      if (val == "month") {
        this.$emit("input", new Date());
      } else if (val == "year") {
        this.$emit("input", new Date(new Date().getFullYear(), 0, 1));
      }
    }
  },
  methods: {
    ...mapActions([
      "setDateBy" // проксирует `this.setDateBy()` в `this.$store.dispatch('setDateBy')`
    ]),
    clickOutside() {
      this.visible = false;
    }
  },
  data() {
    return {
      value: this.$attrs.value || 0,
      lock: false,
      visible: false
    };
  }
};
</script>
<style lang="scss" scoped>
.selector {
  text-transform: capitalize;
  background-image: url("../../assets/arrow.svg");
  background-position: 100% 50%;
  background-repeat: no-repeat;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  &-list {
    position: absolute;
    z-index: 70;
    display: block;
    line-height: 2;
    border: 1px solid #d8d8d8;
    background: #fff;
    margin-block-start: 0.5em;
    padding-inline-start: 0px;
    padding-inline-end: 0px;
    padding: 0;
    font-size: 16px;
    min-width: 150px;
    &-elem {
      cursor: pointer;
      display: block;
      padding: 0 14px;
      &:hover,
      &:active,
      &__active {
        background: #f0f0f0;
      }
    }
  }
}
</style>
