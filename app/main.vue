<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #fff;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: url(https://pay.weixin.qq.com/wiki/doc/api/img/logo.png?v=20161227) no-repeat;
        border-radius: 3px;
        margin: 15px auto;
    }
</style>
<template>
<div class="layout">
    <Tabs :animated="false">
        <Tab-pane label="通用设置">
            <CommonSettings :settings.sync="settings">
            </CommonSettings>
            <Button type="primary" @click="debug_button">保存</Button>
        </Tab-pane>
        <Tab-pane label="接口调试">
            <Row type="flex">
                <i-col span="5" class="layout-menu-left">
                    <Menu theme="light" width="auto" v-on:on-select="menu_select">
                        <div class="layout-logo-left"></div>
                        <MenuGroup v-for="(item_group,index) in api_template_tree[0].children" v-bind:key="item_group.key" :title="item_group.title">
                            <template v-for="(item_sub,index) in item_group.children">
                                <template v-if="item_sub.children.length==0">
                                    <Menu-item :name="item_sub.origin_index">
                                        {{ api_template_data[item_sub.origin_index].descript }}
                                    </Menu-item>
                                </template>
                                <template v-else>
                                    <Submenu :name="item_sub.title">
                                        <template slot="title">
                                            {{ item_sub.title }}
                                        </template>
                                        <Menu-item :name="item.origin_index" v-for="item in item_sub.children" v-bind:key="item.key">
                                            {{ api_template_data[item.origin_index].descript }}
                                        </Menu-item>
                                    </Submenu>
                                </template>
                            </template>
                        </MenuGroup>
                    </Menu>
                </i-col>
                <i-col span="19">
                    <div class="layout-header"></div>
                    <div class="layout-breadcrumb"></div>
                    <div class="layout-content">
                        <div class="layout-content-main" is="TemplateContent" :api_template_content='api_template_content'>点击左侧菜单打开接口模板</div>
                    </div>
                    <div class="layout-copy">
                        2011-2016 &copy;
                    </div>
                </i-col>
            </Row>
        </Tab-pane>
        <Tab-pane label="其他工具">
            <MiscTools>
            </MiscTools>
        </Tab-pane>
    </Tabs>

</div>
</template>

<script>
    import CommonSettings from './common_settings.vue'
    import TemplateContent from './template_content.vue'
    import MiscTools from './misc_tools.vue'
    import dataTree from 'data-tree'
    //import PATH from 'path'

    function requireAll(requireContext) {
        return requireContext.keys().map(requireContext);
    }

    export default {
        data() {
            return {
                some_string: "测试字符串",
                api_template_content: "{}",
                settings:{
                    mch_id:"",
                    appid:"",
                    key:"",
                    cert:"",
                    cert_key:"",
                }
            }
        },
        created() {
        },
        methods: {
            show_content(event) {
                if (event) {
                    this.main_content = "test"
                }
            },
            menu_select(name) {
                this.api_template_content = this.api_template_data[name]
            },
            debug_button: function() {
                console.log(this.settings)
            }
        },
        computed: {
            api_template_context: function () {
                return require.context('../api_template/', true, /\.json$/)
            },
            api_template_data: function () {
                function requireAll(requireContext) {
                    return requireContext.keys().map(requireContext);
                }
                var modules = requireAll(this.api_template_context);
                return modules
            },
            api_template_tree: function () {
                var tree = dataTree.create();
                var rootNode = tree.insert({
                    key: '#root',
                    value: {
                        name: 'root',
                        something: '1'
                    }
                });
                this.api_template_context.keys().forEach(function (i, index) {
                    console.log(i)
                    //2.
                    var cNode = rootNode
                    i.split('/').forEach(function (m, n, o) {
                        //console.log(o.length)
                        if (m == '.') return;
                        var data = {
                            name: m
                        }
                        var tryNode = tree.traverser().searchDFS(function (node_info) {
                            return node_info.key === n + m
                        })
                        console.log(tryNode)

                        if (tryNode) {
                            cNode = tryNode
                        } else {
                            //if this is the last one, we need more data
                            if (n == o.length - 1) {
                                data.origin_index = index
                                data.path = i
                            }
                            cNode = tree.insertToNode(cNode, {
                                key: n + m,
                                value: data
                            })
                        }
                    })
                })
                var result_tree = tree.export(function (data) {
                    return {
                        title: data.value.name,
                        expand: true,
                        origin_index: data.value.origin_index,
                        path: data.value.path
                    }
                })
                console.log(result_tree)
                return [result_tree]
            }
        },
        components: {
            TemplateContent,
            CommonSettings,
            MiscTools
        }
    }
</script>