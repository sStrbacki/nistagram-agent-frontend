<template>
  <b-container>
    <b-row cols="2" align-h="center">

      <div class="reg-form" >
        <b-row align-h="center" class="mb-4">
          <h1>Reset your password</h1>
        </b-row>

        <b-row cols="1" align-h="center">
          <PasswordField type="password-reset"></PasswordField>
        </b-row>

        <b-row align-h="center" class="mt-5">
          <b-button variant="success" @click="changePassword()" :disabled=" this.password === '' ">
            Change password
          </b-button>
        </b-row>

      </div>
    </b-row>
  </b-container>
</template>

<script>
import PasswordField from "@/components/sign-up/PasswordField";
export default {
  name: "PasswordReset",
  components: { PasswordField },
  props: {
      uuid: String,
      ruuid: String
  },
  computed: {
      password: {
        get(){
            return this.$store.state.passwordReset.password
        }
    }
  },
  methods: {
    changePassword() {
      this.$store.dispatch('changePassword');
    }
  },
  mounted() {
      this.$store.commit('setUUID', this.uuid);
      this.$store.commit('setRUUID', this.ruuid);
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