<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="form__container">
        <div
          class="form__item"
          v-for="(item, formId) in this.people"
          :key="formId"
        >
          <TheForm
            :formId="formId"
            :people="people"
            @setNextFocus="setNextFocus"
            ref="form"
          />
        </div>
      </div>
    </div>
    <button
      @click.stop.prevent="checkValidate"
      v-if="this.$route.params.peopleCount"
      class="payment-btn btn btn-primary text-center mt-1 mb-5 container"
    >
      Continue To Payment
      <!-- <router-link
        class="payment-btn"
        :to="{
          name: 'Payment',
          params: { peopleCount: this.people },
        }"
        >Continue To Payment</router-link
      > -->
    </button>

    <p v-if="this.$route.params.peopleCount" class="text-center">
      *You are going to pay ${{ totalPayment }}
    </p>
    <!-- <button @click="checkValidate()">Click</button> -->

    <h1 v-if="!this.$route.params.peopleCount">
      Please choose your hotel and people to see reservation form.
    </h1>
  </div>
</template>

<script>
import TheForm from "@/components/TheForm.vue";
import validationMixin from "@/mixins/validationMixin.js";

export default {
  name: "App",
  components: {
    TheForm,
  },
  mixins: [validationMixin],

  data() {
    return {
      people: this.$route.params.peopleCount,
      totalPayment: this.$route.params.totalPayment,
    };
  },
  methods: {
    setNextFocus(e) {
      if (e + 1 < this.people) {
        this.$refs.form[e + 1].$refs["firstName" + (e + 1)].focus();
      } else {
        this.$router.push({
          path: "/payment",
          params: { totalPayment: this.totalPayment },
        });
      }
    },
    checkValidate() {
      // for (let i = 0; i < this.people; i++) {
      //   console.log(this.$refs.form[i].$v.$invalid);
      // }
      if (
        this.$refs.form.every((form) => !form.$v.$anyError && form.$v.$anyDirty)
      ) {
        console.log("its valid");
        this.$router.push("/payment");
      } else {
        console.log("its not valid");
      }
    },
  },
};
</script>

<style scoped>
.form__container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 60%;
}

.form__item {
  width: 25%;
  margin: 1rem;
}
.payment-btn {
  display: flex;
  justify-content: center;
  color: white;
  width: 25%;
}
</style>
