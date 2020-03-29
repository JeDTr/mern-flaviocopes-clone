<template>
  <div>
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="handleSubmit" novalidate="true">
      <input type="email" v-model="$v.customer.email.$model" />
      <!-- <Input :vField="$v.customer.email" /> -->
      <template v-if="$v.customer.email.$error">
        <span v-if="!$v.customer.email.required" class="invalid-feedback">This field is required</span>
        <span v-if="!$v.customer.email.email" class="invalid-feedback">Invalid Email</span>
      </template>
      <input type="password" v-model="$v.customer.password.$model" />
      <template v-if="$v.customer.password.$error">
        <span v-if="!$v.customer.password.required" class="invalid-feedback">This field is required</span>
      </template>
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
// import * as yup from "yup";
import { mapGetters, mapActions } from "vuex";

// import Input from "@/components/Input";

export default {
  data() {
    return {
      customer: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters("auth", ["hasErrors"])
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleSubmit() {
      this.$v.$touch();

      if (!this.$v.$error) {
        await this.login(this.customer);

        if (!this.hasErrors) {
          this.$router.push("Dashboard");
        }
      }
    }
  },
  validations: {
    customer: {
      email: { required, email },
      password: { required }
    }
  }
  // components: {
  //   Input
  // }
};
</script>

<style scoped src="./style.css">
</style>