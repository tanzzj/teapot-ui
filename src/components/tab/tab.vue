<template>
    <div class="tab">
        <el-menu
                :collapse="isCollapse"
                active-color="#cecece"
                background-color="#eaeaea"
                mode="vertical"
        >
            <template v-for="(menuItem) in menuData.menuList">
                <el-menu-item :index="menuItem.index" @click="turnTo(menuItem)">
                    <span slot="title">{{menuItem.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
    //菜单
    const menuData = require("@components/tab/menu.json")

    export default {
        name: "tab.vue",
        mounted() {
            console.log(this.menuData)
        },
        data() {
            return {
                router: this.$router,
                /**
                 * 菜单是否关闭
                 */
                isCollapse: false,
                menuData: menuData,
            }
        },
        methods: {
            turnTo(menuItem) {
                if (menuItem.type === 'redirect') {
                    this.router.push({
                        name: 'custom',
                        params: {
                            redirectTo: menuItem.redirectTo
                        }
                    })
                } else {
                    this.router.push({
                        name: menuItem.name
                    })
                }

            }
        }
    }
</script>

<style scoped>
    @import 'style.css';
</style>