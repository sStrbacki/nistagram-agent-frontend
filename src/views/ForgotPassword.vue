<template>
  <b-container>
    <b-row cols="2" align-h="center">

      <div class="reg-form" >
        <b-row align-h="center" class="mb-4">
          <h1>Request a password reset</h1>
        </b-row>

        <b-row cols="1" align-h="center">
          <b-form-input placeholder="Username" v-model="username"></b-form-input>
        </b-row>

        <b-row cols="1" align-h="center" class="mt-4">
          <b-button @click="sendRequest()" :disabled="!checkCredentials"> Send request </b-button>
        </b-row>

      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ForgotPassword",
  computed: {
    username: {
      get() {
        return this.$store.state.login.loginData.username;
      },
      set(value) {
        this.$store.commit("updateUsername", value);
      }
    },
    checkCredentials() {
      return this.username;
    }
  },
  methods: {
    sendRequest() {
      this.$store.dispatch('requestPasswordChange')
    }
  }
}
</script>

<style scoped>
    .reg-form{
      margin-top: 5em;
      color: rgb(36, 35, 35);
      background-color: rgb(224, 220, 220);
      padding: 3em;
      border-radius: 6px;
      box-shadow: 5px 5px 10px #1d1d1d;
    }
    .notif-text {
      margin-top: 0.3em;
    }
    .sub-notif-text {
      margin-left: 2.5em;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
</style>