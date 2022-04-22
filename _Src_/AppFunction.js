import { View, Text } from 'react-native'
import React from 'react'

const AppFunction = {

    getToday: () => {
        let newDate = new Date()
        let date = "0" + newDate.getDate();
        let month = "0" + Number(newDate.getMonth() + 1);
        let year = newDate.getFullYear();
        var dispDate = date.slice(date.length - 2, date.lengths) + "/" + month.slice(month.length - 2, month.lengths) + "/" + year
        var dataDate = year.toString() + month.slice(month.length - 2, month.lengths) + date.slice(date.length - 2, date.lengths)

        return {
            dispDate: dispDate, dataDate: dataDate
        }
    },

    now: () => {
        let now = new Date();
        return (
            ('0' + now.getHours()).slice(-2) +
            ('0' + now.getMinutes()).slice(-2) +
            ('0' + now.getSeconds()).slice(-2)
        );
    },

    getTime: () => {
        let newTime = new Date()
        let minutes = "0" + newTime.getMinutes();
        let seconds = "0" + newTime.getSeconds();
        let hours = "0" + newTime.getHours();

        let dispTime = hours.slice(hours.length - 2, hours.lengths) + ":" + minutes.slice(minutes.length - 2, minutes.lengths) + ":" + seconds.slice(seconds.length - 2, seconds.lengths)
        let dataTime = hours.slice(hours.length - 2, hours.lengths) + "" + minutes.slice(minutes.length - 2, minutes.lengths) + "" + seconds.slice(seconds.length - 2, seconds.lengths)
        return {
            dispTime: dispTime, dataTime: dataTime
        }
    },
}

export default AppFunction