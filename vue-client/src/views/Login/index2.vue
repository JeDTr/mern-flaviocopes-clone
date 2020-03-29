<template>
  <div>
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="handleSubmit" novalidate="true">
      <!-- <input type="number" name="id" v-model.number="id" /> -->
      <input type="email" name="email" id="email" v-model="customer.email" />
      <input type="password" name="password" id="password" v-model="customer.password" />
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/composition-api";
import { required, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
// import * as yup from "yup";

export default {
  setup() {
    const state = reactive({
      customer: {
        email: "",
        password: ""
      }
      // id: "",
    });

    const validations = useVuelidate(
      {
        customer: {
          email: { required, email },
          password: { required }
        }
      },
      toRefs(state)
    );

    // const validationSchema = yup.object().shape({
    //   // id: yup.string().required(),
    //   customer: yup.object().shape({
    //     email: yup
    //       .string()
    //       .email()
    //       .required(),
    //     password: yup.string().required()
    //   })
    // });

    const handleSubmit = () => {
      // console.log(state.id === parseInt(state.id));
      // validationSchema
      //   .validate(state, { abortEarly: false })
      //   .then(console.log(state))
      //   .catch(error => {
      //     error.inner.forEach(({ path, message }) =>
      //       console.log(`${path}: ${message}`)
      //     );
      //   });
      // debugger;
      console.log(
        "required invalid: ",
        validations.customer.email.required.$invalid
      );
      console.log("invalid email: ", validations.customer.email.email.$invalid);
      // console.log(state.customer.email);
    };

    return { ...toRefs(state), handleSubmit, validations };
  }
  // validations: {
  //   customer: {
  //     email: { required },
  //     password: { required, email }
  //   }
  // }
};
</script>

<style scoped src="./style.css">
</style>