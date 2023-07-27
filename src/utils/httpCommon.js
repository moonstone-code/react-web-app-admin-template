import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';

const GetBaseURL = 'http://localhost:16543';
const AxiosBaseURL = axios.create({
    baseURL: GetBaseURL
});

const Error_handling = function (err_obj) {
    if (err_obj.response.data.session_expire_code === 8902636) {
        return err_obj.response.data.mess_body;
    } else if (err_obj.code === "ERR_NETWORK") {
        return " URL Request Not Found !";
    } else if (err_obj.response && err_obj.response.data) {
        return err_obj.response.data.mess_body;
    } else {
        return err_obj;
    }
};

const Success_handling = function (obj) {
    console.log(obj);
    if (obj.statusText === "OK") {
        return obj.data.mess_body;
    } else {
        return obj;
    }
};

const CallAlert = function (type, msg, timer, position, showConfirmButton, showCancelButton, confirmButtonText) {
    position = Check_string_val(position, '') === '' || Check_string_val(position, '') === 'bottom-end' ? 'bottom-end' : 'top-end'; // center-end
    showConfirmButton = Check_string_val(showConfirmButton, false) === false ? false : true;
    showCancelButton = Check_string_val(showCancelButton, false) === false ? false : true;
    var Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: showConfirmButton,
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        timer: Check_string_val(timer, '') === '' ? 3000 : timer
    });
    Toast.fire({
        icon: type,
        title: msg
    });
};

const Check_string_val = function (str, defultVal) {
    str = str === null || str === undefined || str === 'undefined' || str === 'null' || str === "" ? defultVal : str;
    return str;
};

const TimeSince = (date) => {

    var seconds = Math.floor((new Date() - new Date(date)) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " day"; //days
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hou"; //hours
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " min"; //minutes
    }
    return Math.floor(seconds) + " sec"; //seconds
};
export function GetFormattedDate(date) {
    let todayTime = new Date(date);
    let month = todayTime.toLocaleString('default', { month: 'long' });
    let day = String(todayTime.getDate());
    let year = String(todayTime.getFullYear());
    return month + "," + day + " " + year;
}
export function HandleCheckboxChange(value, checked, checkboxes, setCheckboxes) {
    // const [checkboxes, setCheckboxes] = useState(['']);
    if (checked) {
        setCheckboxes([...checkboxes, value]);
    } else {
        setCheckboxes(checkboxes.filter((item) => item !== value));
    }
    return checkboxes;
};


export { AxiosBaseURL, GetBaseURL, Error_handling, Success_handling, CallAlert, Check_string_val, TimeSince };



