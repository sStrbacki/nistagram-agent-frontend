<template>
  <div>
      <agent-navbar/>
      <router-view/>
  </div>
</template>

<script>
import AgentNavbar from '../../components/navbars/AgentNavbar'

export default {
    name:'AgentPage',
    components: { AgentNavbar }
}
</script>

<style>

</style>