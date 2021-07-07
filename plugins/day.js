import dayjs from 'dayjs';
import Vue from "vue"

Vue.filter("date", (value, format = "MMM DD,YYYY") => {
    return dayjs(value).format(format)
})