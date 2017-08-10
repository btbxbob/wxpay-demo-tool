import Vue from 'vue'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import dir from 'node-dir'
import Main from '../app/main.vue'

Vue.config.debug = true
Vue.use(iView)

Vue.component('main-sidebar',{
    name: 'main-sidebar',
    template: "<div>this is a sidebar</div>"
})

Vue.component('main-content',{
    name: 'main-content',
    template: "<div>this is a content</div>"
})

Vue.component('main-view',{
    template: "<div><main-sidebar></main-sidebar><main-content></main-content></div>"
})

Vue.component('main-nav',{
    template: "<div>nav</div>"
})

var main = new Vue({
    el: "#main",
    render: h=>h(Main),
    computed:{
        message: function(){
            var files =dir.files(`api_template/`,{sync: true})
            return files
        }
    }
})

