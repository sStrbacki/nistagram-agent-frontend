<template>
    <div>
        <user-navbar/>
        <router-view/>
    </div>
</template>

<script>
import UserNavbar from '../../components/navbars/UserNavbar.vue'
export default {
    name: 'UserPage',
    components: { UserNavbar }
}
</script>

<style>

</style>