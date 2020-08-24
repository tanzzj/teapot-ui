<template>
    <div style="height: 1080px;width: 1820px">
        <iframe  id="customFrame" :src="this.redirectTo" height="100%" width="1820px"/>
    </div>
</template>

<script>
    export default {
        name: "custom",
        mounted() {

        },
        data() {
            return {
                redirectTo: this.$route.params.redirectTo,
            }
        },
        methods: {}
    }
</script>