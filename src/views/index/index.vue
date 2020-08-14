<template>
    <div>
        <el-container class="index-container">
            <el-header class="head-bar-container">
                <head-bar/>
            </el-header>
            <el-container>
                <el-aside class="tab-container">
                    <tab/>
                </el-aside>
                <el-main>
                    <router-view/>
<!--                    <iframe name="customFrame"></iframe>-->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'hello-teapot',
        props: {
            msg: String
        },
        data() {
            return {
                message: 'this is an index'
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
    * {
        padding: 0
    }
</style>
