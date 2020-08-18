<template>
    <div>
        <iframe :src="redirectTo">

        </iframe>
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
        methods: {
        }
    }
</script>