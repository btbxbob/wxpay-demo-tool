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

                <Form-item>
                    <Button type="primary" @click="debug_button">保存</Button>
                </Form-item>
            </Form>
            {{ settings }}
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        props: ['settings'],
        data() {
            return {}
        },
        methods: {
            debug_button: function () {
                console.log(this.settings)
            },
            get_url: function(event,data){
                console.log(event,data)
            }
        }
    }
</script>