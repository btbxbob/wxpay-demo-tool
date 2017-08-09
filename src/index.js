import Vue from 'vue';

Vue.config.debug = true;

var app = new Vue({
    el: "#app",
    data:{
        message: 'Hello Vue!'
    }
})