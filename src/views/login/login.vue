<template>
    <el-container v-loading="loadingStatus">
        <el-main>
            <el-card class="box-card">
                <p>测试帐号：tanzj 测试密码：tanzj</p>
                <div class="username">
                    <el-input placeholder="type your username" type="text" v-model="username"/>
                </div>
                <div class="password">
                    <el-input placeholder="type your password" type="password" v-model="password"/>
                </div>
                <el-button class="loginButton" @click="doLogin"> GO</el-button>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    import {_login} from '@views/login/login.js';

    export default {
        name: "login.vue",
        data() {
            return {
                router: this.$router,
                username: null,
                password: null,
                loadingStatus: false
            }
        },
        methods: {
            doLogin() {
                _login({
                        username: this.username,
                        password: this.password
                    }
                ).then(({result, message, data}) => {
                    if ('success' === result) {
                        console.log(result);
                        //跳转到index页
                        this.router.push("/")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>