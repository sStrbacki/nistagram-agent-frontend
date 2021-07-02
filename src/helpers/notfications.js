import Vue from "vue";

export function successMessage(msg) {
    Vue.notify({
        group: 'notification',
        text: msg,
        type: 'success'
    });
}

export function errorMessage(msg) {
    Vue.notify({
        group: 'notification',
        text: msg,
        type: 'error'
    });
}
