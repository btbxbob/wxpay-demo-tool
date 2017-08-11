import Vue from 'vue' 
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
//import dir from 'node-dir'
import Main from '../app/main.vue'
//import nw from 'nw'

Vue.config.debug = true
Vue.use(iView)

var main = new Vue({
    el: "#main",
    render: h => h(Main),
    computed:{
        message: function(){
            //var files =dir.files(`api_template/`,{sync: true})
            //return files
        }
    }
})