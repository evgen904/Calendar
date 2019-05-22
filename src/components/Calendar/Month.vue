<template>
  <div class="month">
    <div>
      <div class="month-title">
        {{ dateMonth.toLocaleString(this.lang, { month: "long" }) }}
        {{ dateMonth.getFullYear() }}
      </div>
      <table cellspacing="0" cellpadding="0">
        <tr>
          <th v-for="day in weekday" :key="day">
            {{ day }}
          </th>
        </tr>

        <tr v-for="(weeks, index) in days" :key="index">
          <template v-for="(date,wi) in weeks">
            <Day
              :date="date"
              :dateMonth="dateMonth"
              v-if="date"
              :key="date"
            />
            <Day
              v-else
              typeCalendar="month"
              :date="

                (index<2) ?
                  new Date(
                    dateMonth.getFullYear(),
                    dateMonth.getMonth() + (index<2 ? -1 : 0),
                    weeks.filter(a=>a).length-(7-wi)
                  ).getDate()
                 : new Date(dateMonth.getFullYear(),dateMonth.getMonth()+1,wi)



              "
              :dateMonth="new Date(
                dateMonth.getFullYear(),
                dateMonth.getMonth() + (index<2 ? -1 : +1),
                1
              )"
            />
          </template>
          <!--<td v-else class="another-month">-->
            <!--<div></div>-->
          <!--</td>-->

          <!--new Date(-->
          <!--dateMonth.getFullYear(),-->
          <!--dateMonth.getMonth() + (index<2 ? -1 : 0),-->
          <!--(index<2 ? weeks.filter(a=>a).length-(7-wi) : weeks.filter(a=>a).length-wi)-->
          <!--).getDate()-->



        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Day from "./Day.vue";
import _ from "lodash-es";

export default {
  name: "Month",
  components: {
    Day
  },
  computed: {
    days() {
      let days = [];
      if (this.dateMonth.getDay() > 0) {
        days = Array(this.dateMonth.getDay() - 1); //Воссоздаем пропущеные дни недели на нaчало месяца (-1 день недели для сдвига дней недель)
      } else {
        days = Array(6);
      }
      let lastDay = new Date(
        this.dateMonth.getFullYear(),
        this.dateMonth.getMonth() + 1,
        0
      );
      days = days.concat(_.range(1, lastDay.getDate() + 1)); // Заполняем днями месяца
      if (lastDay.getDay() != 0)
        days = days.concat(Array(7 - (days.length % 7))); //Воссоздаем пропущеные дни недели на конец месяца (+1 день недели для сдвига дней недель)

      return _.chunk(days, 7); // Разбиваем по неделям
    },
    weekday() {
      return this.days[1].map(date =>
        new Date(
          this.dateMonth.getFullYear(),
          this.dateMonth.getMonth(),
          date
        ).toLocaleString(this.lang, { weekday: "short" })
      );
    }
  },
  props: {
    dateMonth: {
      type: Date,
      required: true
    },
    lang: {
      default: "ru-RU",
      type: String,
      validator(value) {
        return ["ru-RU", "en-US"].includes(value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.month {
  margin-right: 20px;
  margin-bottom: 30px;
  &:nth-child(4n) {
    margin-right: 0;
  }
  &-title {
    text-align: center;
    color: #444444;
    font-size: 17px;
    margin-bottom: 16px;
  }
  table {
    border-collapse: collapse;
    border: none;
    border-spacing: 0;
    padding: 0;
    margin: 0;
    tr {
      th {
        font-weight: normal;
        color: #444444;
        font-size: 14px;
        border-collapse: collapse;
        border-spacing: 0;
        padding: 0 4px 6px 0;
        margin: 0;
        text-align: right;
        &:nth-child(6),
        &:nth-child(7) {
          color: #f51449;
        }
      }
    }
  }
}
</style>
