<template>
  <div>
      <Row>
          <Col type="flex" :span="12" justify="center">
      <Form :model="settings" label-position="left" :label-width="130">
          <Form-item label="商户号（即mch_id）">
              <Input v-model="settings.mch_id"></Input>
          </Form-item>
          <Form-item label="APPID">
              <Input v-model="settings.appid"></Input>
          </Form-item>
          <Form-item label="秘钥">
              <Input v-model="settings.key"></Input>
          </Form-item>
          <Form-item label="证书（pem文件）">
              <Upload v-model="settings.cert" action="about:blank">
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="debug_button">保存</Button>
        </Form-item>
      </Form>
      </Col>
      </Row>
  </div>
</template>

<script>
export default {
    props:['settings'],
    data(){
        return {
        }
    },
    methods:{
        debug_button: function() {
            console.log(this.settings)
        }
    }
}
</script>
