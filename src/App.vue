<template>
  <div id="app">
    <div class="nav-top">
      <div class="nav-top-left">
        <button @click="prevStage" type="button">prev</button>
        <button @click="nextStage" type="button">next</button>

        <Selector :typeSelect="typeCalendar" v-model="beginDate" />
      </div>
      <div class="nav-top-right">
        <label for="month">
          <input type="radio" id="month" v-model="typeCalendar" name="type-calendar" value="month"> Месяц
        </label>
        <label for="year">
          <input type="radio" checked id="year" v-model="typeCalendar" name="type-calendar" value="year"> Год
        </label>
      </div>

    </div>
    <br><br>
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
      }
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
        prevStage () {
            let step = (this.typeCalendar == "year") ? 12 : 1;
            this.beginDate = new Date(
                new Date(this.beginDate).setMonth(this.beginDate.getMonth() - step)
            );
        },
        nextStage () {
            let step = (this.typeCalendar == "year") ? 12 : 1;
            this.beginDate = new Date(
                new Date(this.beginDate).setMonth(this.beginDate.getMonth() + step)
            );
        }
    },
    mounted () {
        if (this.typeCalendar == "year") {
            this.countMonth = 12;
        } else if (val == "month") {
            this.countMonth = 1;
        }
    },
  name: "app"
};
</script>

<style lang="scss">
  body {
    background: #F2F2F2;
  }
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
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
  }
  &-right {

  }
}




</style>
