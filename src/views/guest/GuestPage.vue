<template>
    <div>
        <guest-navbar/>
        <router-view/>  
    </div>
</template>

<script>
import GuestNavbar from '../../components/navbars/GuestNavbar'

export default {
    name: 'GuestPage',
    components: { GuestNavbar }

}
</script>

<style>

</style>