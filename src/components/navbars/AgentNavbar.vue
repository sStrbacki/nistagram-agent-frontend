<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="user-navbar" fixed="top" :sticky=true>
      <b-navbar-brand :to="{ name: 'Products' }">
        <b-row align-v="center" class="ml-2">
          <b-icon icon="shop" class="mr-2"></b-icon>
          <div class="ml-2">My shop</div>
        </b-row>
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="person-circle" class="mb-1 mr-1"></b-icon>
              Username placeholder
            </template>
            <b-dropdown-item @click="logOut"> Sign Out</b-dropdown-item>
            <b-dropdown-item @click="openCampaigns">Campaigns</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import {clearJwt} from '../../helpers/jwt'
import {clearLocalRole} from '../../helpers/roles'

export default {
  name: 'AgentNavbar',
  methods: {
    logOut() {
      clearJwt()
      clearLocalRole()
      this.$router.push({name: 'Login'})
    },
    openCampaigns() {
      this.$router.push({name: 'Campaigns'})
    }
  }
}
</script>

