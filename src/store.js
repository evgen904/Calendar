import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const dateByIndex = date =>
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date
        .getDate()
        .toString()
        .padStart(2, "0");
// const dateOnIndex = (date) => {
//   date = date.split("-").map(v => parseInt(v))
//   return new Date(
//     date[0].getFullYear(),
//     date[1].getMonth(),
//     date[2].getDate()
//   )
// }

export default new Vuex.Store({
    state: {
        hotelID: null,
        isMobile: false,
        beginDate: new Date(),
        filterDate: null,
        countDay: 10,
        sorting: 0,
        objects: []
    },
    getters: {
        getObjects(state) {
            let arrayFilterDates;
            if (state.filterDate) {
                let countDay =
                    (state.filterDate.out.getTime() - state.filterDate.in.getTime()) /
                    (1000 * 60 * 60 * 24) +
                    1;

                arrayFilterDates = [...Array(countDay).keys()].map(day => {
                    let date = new Date(
                        state.filterDate.in.getFullYear(),
                        state.filterDate.in.getMonth(),
                        state.filterDate.in.getDate() + day
                    );
                    return dateByIndex(date);
                });
            }

            return state.objects.filter(v => {
                let bool = {};
                if (state.sorting == 1) {
                    if (v.public == true) bool.public = true;
                    else bool.public = false;
                }
                if (state.filterDate) {
                    bool.date =
                        arrayFilterDates.find(date => {
                            return v.availability[date] == undefined;
                        }) == undefined;
                }
                return !Object.values(bool).includes(false);
            });
        },
        selectData(state) {
            return state.objects;
        },

        columnDates: state => {
            return [...Array(state.countDay).keys()].map((day, index) => {
                let date = new Date(
                    state.beginDate.getFullYear(),
                    state.beginDate.getMonth(),
                    state.beginDate.getDate() + day
                );
                return {
                    date: date,
                    isMonth: index == 0 || date.getDate() == 1 ? true : false
                };
            });
        },
        getStateByDate: (state, getters) => date => {
            let dateIndex = dateByIndex(date);
            return getters.getObjects.map(object => {
                return {
                    id: object.id,
                    availability: object.availability[dateIndex] || 0,
                    booking: object.booking[dateIndex] || 0
                };
            });
        }
    },
    mutations: {
        setFilterDate(state, value) {
            state.filterDate = value;
        },
        saveDate(state, value) {
            let countDay =
                (value.date.out.getTime() - value.date.in.getTime()) /
                (1000 * 60 * 60 * 24) +
                1;

            let arrayFilterDates = [...Array(countDay).keys()].map(day => {
                let date = new Date(
                    value.date.in.getFullYear(),
                    value.date.in.getMonth(),
                    value.date.in.getDate() + day
                );
                return dateByIndex(date);
            });

            let object = state.objects.find(item => item.id == value.id);
            arrayFilterDates.map(date => {
                object.availability[date] = value.rooms;
            });
        },

        initObjects(state, value) {
            state.objects = value;
        },
        setCountDay(state, value) {
            state.countDay = value;
        },

        setDateBy(state, date) {
            let currentDate = new Date();
            if (date.getTime() < Date.now()) state.beginDate = new Date();
            else if (
                Math.ceil(
                    (date.getTime() - currentDate.getTime()) / (24 * 60 * 60 * 1000)
                ) +
                state.countDay >
                365
            )
                state.beginDate = new Date(
                    currentDate.getFullYear() + 1,
                    currentDate.getMonth(),
                    currentDate.getDate() - state.countDay
                );
            else state.beginDate = date;
        },

        incrementStep(state) {
            let currentDate = new Date();
            // console.log("ДНЕЙ ОТ НАЧАЛА: ",(state.beginDate.getTime() - currentDate.getTime())/(24*60*60*1000));
            // console.log("ДНЕЙ С УЧЕТОМ ОТКРЫТЫХ: ", Math.ceil((state.beginDate.getTime() - currentDate.getTime())/(24*60*60*1000)) + 2*state.countDay);

            if (
                Math.ceil(
                    (state.beginDate.getTime() - currentDate.getTime()) /
                    (24 * 60 * 60 * 1000)
                ) +
                2 * state.countDay >
                365
            ) {
                state.beginDate = new Date(
                    currentDate.getFullYear() + 1,
                    currentDate.getMonth(),
                    currentDate.getDate() - state.countDay
                );
            } else {
                state.beginDate = new Date(
                    state.beginDate.getFullYear(),
                    state.beginDate.getMonth(),
                    state.beginDate.getDate() + state.countDay
                );
            }
        },
        decrementStep(state) {
            let currentDate = new Date();
            if (
                currentDate.getFullYear() >= state.beginDate.getFullYear() &&
                currentDate.getMonth() >= state.beginDate.getMonth() &&
                currentDate.getDate() + state.countDay >= state.beginDate.getDate()
            )
                state.beginDate = currentDate;
            else
                state.beginDate = new Date(
                    state.beginDate.getFullYear(),
                    state.beginDate.getMonth(),
                    state.beginDate.getDate() - state.countDay
                );
        },
        increment(state) {
            if (
                new Date().getTime() + 365 * 24 * 60 * 60 * 1000 <
                state.beginDate.getTime() + state.countDay * 24 * 60 * 60 * 1000
            )
                return;

            state.beginDate = new Date(
                state.beginDate.getFullYear(),
                state.beginDate.getMonth(),
                state.beginDate.getDate() + 1
            );
        },
        decrement(state) {
            let currentDate = new Date();
            if (
                currentDate.getFullYear() >= state.beginDate.getFullYear() &&
                currentDate.getMonth() >= state.beginDate.getMonth() &&
                currentDate.getDate() >= state.beginDate.getDate()
            )
                return;
            state.beginDate = new Date(
                state.beginDate.getFullYear(),
                state.beginDate.getMonth(),
                state.beginDate.getDate() - 1
            );
        },

        setStateByDateAndId(state, { id, date, value }) {
            let dateIndex = dateByIndex(date);
            state.objects.find(object => object.id === id).availability[
                dateIndex
                ] = value;
        },
        updateSorting(state, value) {
            state.sorting = value;
        }
    },
    actions: {
        setFilterDate(context, date) {
            context.commit("setFilterDate", date);
        },
        saveDate(context, value) {
            context.commit("saveDate", value);
        },

        initObjects(context, objects) {
            context.commit("initObjects", objects);
        },
        setStateByDateAndId(context, value) {
            context.commit("setStateByDateAndId", value);
        },
        setCountDay(context, value) {
            context.commit("setCountDay", value);
        },
        setDateBy(context, date) {
            context.commit("setDateBy", date);
        },
        incrementStep(context) {
            context.commit("incrementStep");
        },
        decrementStep(context) {
            context.commit("decrementStep");
        },
        increment(context) {
            context.commit("increment");
        },
        decrement(context) {
            context.commit("decrement");
        }
    }
});
