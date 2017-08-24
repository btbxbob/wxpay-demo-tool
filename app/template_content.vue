<template>
  <div>
    <Steps :current="Number(current_step)">
      <Step title="填写字段"></Step>
      <Step title="生成签名"></Step>
      <Step title="检查XML"></Step>
      <Step title="检查返回"></Step>
    </Steps>
    <Tabs :animated="false" v-model="current_step">
      <Tab-pane label="字段列表" name="0">
        <Button @click="next">下一步</Button>
      </Tab-pane>
      <Tab-pane label="签名" name="1">

      </Tab-pane>
      <Tab-pane label="发送XML检查" name="2">
          <pre v-highlightjs="to_send_xml">
            <code class="xml">
            </code>
          </pre>
      </Tab-pane>
      <Tab-pane label="返回" name="3">
      </Tab-pane>
    </Tabs>
    <div></div>
  </div>
</template>
<script>
import js2xmlparser from 'js2xmlparser'
import beautify from 'xml-beautifier'
import hightLight from 'highlight.js'

export default {
  props:['api_template_content'],
  data(){
    return {
      current_step:0
    }
  },
  created(){
  },
  computed:{
    to_send_xml(){
      return js2xmlparser.parse("xml",this.to_send_object)
    },
    to_send_object(){
      var to_send_object={}
      for (var key in this.api_template_content.xml){
          to_send_object[key]=this.api_template_content.xml[key].value?this.api_template_content.xml[key].value:this.api_template_content.xml[key].default
      }
      return to_send_object
    }
  },
  methods:{
    set_current_step(step){
      this.current_step=step
    },
    next(){

    }
  }
}
</script>
