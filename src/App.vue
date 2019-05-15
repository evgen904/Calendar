<template>
  <div id="app">
    <div class="nav-top">
      <div class="nav-top-left">
        <button @click="prevStage" type="button" class="prev"></button>
        <button @click="nextStage" type="button" class="next"></button>

        <Selector :typeSelect="typeCalendar" v-model="beginDate"/>
      </div>
      <div class="nav-top-right">
          <div class="price-mode">
              Режим цен
              <input type="checkbox" id="price-modal">
              <label for="price-modal"></label>
          </div>
          <div class="type-calendar">
              <input
                      type="radio"
                      id="month"
                      v-model="typeCalendar"
                      name="type-calendar"
                      value="month"
              />
              <label for="month">
                  Месяц
              </label>
              <input
                      type="radio"
                      checked
                      id="year"
                      v-model="typeCalendar"
                      name="type-calendar"
                      value="year"
              />
              <label for="year">
                  Год
              </label>
          </div>
      </div>
    </div>
    <br /><br />
    <Calendar
      :beginDate="beginDate"
      :countMonth="countMonth"
      v-model="date"
    ></Calendar>
  </div>
</template>

<script>
import Calendar from "./components/Calendar";
import Selector from "./components/base/baseSelector";

export default {
  components: {
    Calendar,
    Selector
  },
  data() {
    return {
      countMonth: 1,
      beginDate: new Date(),
      date: {},
      typeCalendar: "year"
    };
  },
  watch: {
    typeCalendar(val) {
      if (val == "year") {
        this.countMonth = 12;
      } else if (val == "month") {
        this.countMonth = 1;
      }
    }
  },
  methods: {
    prevStage() {
      let step = this.typeCalendar == "year" ? 12 : 1;
      this.beginDate = new Date(
        new Date(this.beginDate).setMonth(this.beginDate.getMonth() - step)
      );
    },
    nextStage() {
      let step = this.typeCalendar == "year" ? 12 : 1;
      this.beginDate = new Date(
        new Date(this.beginDate).setMonth(this.beginDate.getMonth() + step)
      );
    }
  },
  mounted() {
    if (this.typeCalendar == "year") {
      this.countMonth = 12;
      this.beginDate = new Date(new Date().getFullYear(), 0, 1);
    } else if (val == "month") {
      this.countMonth = 1;
      this.beginDate = new Date();
    }
  },
  name: "app"
};
</script>

<style lang="scss">
body {
  background: #f2f2f2;
}
#app {
  font-family: Arial, "Avenir", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
    * {
        box-sizing: border-box;
    }
}

.nav-top {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  &-left {
    display: flex;
    align-items: center;
      button {
          display: block;
          cursor: pointer;
          outline-style: none;
          padding: 0;
          margin: 0 2px 0 0;
          background: #FFFFFF;
          border: 1px solid #D8D8D8;
          box-sizing: border-box;
          border-radius: 3px;
          width: 34px;
          height: 34px;
          position: relative;
          &:after, &:before {
              content: '';
              display: block;
              position: absolute;
              top: 13px;
              left: 10px;
              width: 8px;
              height: 1px;
              background: #464646;
              border-radius: 5px;
          }
          &:after {
              transform: rotate(45deg);
              margin-top: 5px;
          }
          &:before {
              transform: rotate(-45deg);
          }
          &.next {
              transform: rotate(180deg);
              &:after, &:before {
                  left: 11px;
              }
          }
      }
  }
  &-right {
      display: flex;
      align-items: center;
      .price-mode {
          display: flex;
          align-items: center;
          color: #444444;
          font-size: 14px;
          margin-right: 30px;
          input[type="checkbox"] {
              position: absolute;
              clip: rect(0, 0, 0, 0);
              + label {
                  cursor: pointer;
                  display: block;
                  position: relative;
                  background: #FFFFFF;
                  border: 1.2px solid #D8D8D8;
                  box-sizing: border-box;
                  border-radius: 12px;
                  width: 41px;
                  flex: 0 0 41px;
                  height: 24px;
                  padding: 0;
                  margin: 0 0 0 10px;
                  transition: all 0.3s ease;
                  &:after {
                      content: '';
                      display: block;
                      position: absolute;
                      top: 3px;
                      left: 3px;
                      background: #E7E6E6;
                      border: 1.2px solid #D8D8D8;
                      box-sizing: border-box;
                      width: 16px;
                      height: 16px;
                      border-radius: 50%;
                      transition: all 0.3s ease;
                  }
              }
              &:checked {
                  + label {
                      background: #498BC3;
                      &:after {
                          left: 20px;
                          background: #fff;
                      }
                  }
              }
          }
      }
      .type-calendar {
          display: flex;
          input[type="radio"] {
              position: absolute;
              clip: rect(0, 0, 0, 0);
              + label {
                  cursor: pointer;
                  display: block;
                  height: 34px;
                  line-height: 32px;
                  background: #FFFFFF;
                  border: 1px solid #D1D1D1;
                  font-size: 14px;
                  padding: 0 10px;
                  margin: 0 -1px 0 0;
                  min-width: 63px;
                  text-align: center;
                  position: relative;
                  transition: all 0.2s ease;
              }
              &:nth-child(1) + label {
                  border-radius: 3px 0 0 3px;
              }
              &:nth-child(3) + label {
                  border-radius: 0 3px 3px 0;
              }
              &:checked {
                  + label {
                      background: #498BC3;
                      border: 1px solid rgba(0, 0, 0, 0.1);
                      color: #ffffff;
                      z-index: 1;
                  }
              }
          }
      }
  }
}
</style>
