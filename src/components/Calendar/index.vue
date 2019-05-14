<template>
    <div class="calendar-wr">
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
                default: 'range',
                type: String,
                validator(value) {
                    return ['single', 'range'].includes(value);
                }
            },
            lang: {
                default: 'ru-RU',
                type: String,
                validator(value) {
                    return ['ru-RU', 'en-US'].includes(value);
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
        }
    }
</script>

<style lang="scss" scoped>
    .calendar-wr {
        width: 100%;
        max-width: 1180px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
    }
</style>
