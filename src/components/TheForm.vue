<template>
  <div>
    <b-row class="formContainer d-flex flex-column">
      <!-- Name Label & Input -->
      <div>
        <b-form
          class="form-group"
          :class="{ 'form-group--error': $v.firstName.$error }"
        >
          <label class="form__label font-bold text-grey">First Name</label>
          <b-form-input
            placeholder="John"
            class="form__input"
            v-model.trim="$v.firstName.$model"
            :ref="'firstName' + this.formId"
          />
        </b-form>
        <div
          class="error"
          v-if="!$v.firstName.required && $v.firstName.invalid"
        >
          Field is required
        </div>
        <div class="error" v-if="!$v.firstName.minLength">
          Name must have at least
          {{ $v.firstName.$params.minLength.min }} letters.
        </div>
      </div>

      <div>
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.lastName.$error }"
        >
          <label class="form__label font-bold text-grey">Last Name</label>
          <b-form-input
            placeholder="Doe"
            class="form__input"
            v-model.trim="$v.lastName.$model"
          />
        </div>
        <div class="error" v-if="!$v.lastName.required && $v.lastName.dirty">
          Field is required
        </div>
        <div class="error" v-if="!$v.lastName.minLength">
          Name must have at least
          {{ $v.lastName.$params.minLength.min }} letters.
        </div>
      </div>

      <!-- Age Label & Input -->

      <div>
        <div class="form-group" :class="{ 'form-group--error': $v.age.$error }">
          <label class="form__label font-bold text-grey">Age</label>
          <b-form-input
            placeholder=">6"
            class="form__input"
            v-model.trim.lazy="$v.age.$model"
          />
        </div>
        <div class="error" v-if="!$v.age.minValue">
          Must be above {{ $v.age.$params.minValue.min }}
        </div>
      </div>

      <!-- Email Label & Input -->
      <div>
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.email.$error }"
        >
          <label class="form__label">Email</label>
          <b-form-input
            placeholder="johndoe@gmail.com"
            class="form__input"
            v-model.trim.lazy="$v.email.$model"
          />
        </div>
        <span v-if="!$v.email.required && $v.email.$anyDirty"
          >Email is required</span
        >
        <span v-if="!$v.email.email">Email is invalid</span>
      </div>

      <!-- Hes Code Label & Input -->
      <div>
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.hesCode.$error }"
        >
          <label class="form__label">HES Code</label>
          <b-form-input
            placeholder="A1C1-1234-12"
            class="form__input"
            v-model.trim.lazy="$v.hesCode.$model"
          />
        </div>
        <span v-if="!$v.hesCode.required && $v.hesCode.$anyDirty"
          >HES Code is required</span
        >
        <span v-if="!$v.hesCode.hesCodeValidation"
          >Please enter HES code in valid format.
          <div>Ex: A1C1-1234-12</div>
        </span>
      </div>

      <!-- Turkish Citizen Number Label & Input -->
      <div>
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.tcNumber.$error }"
        >
          <label class="form__label">TC Number</label>
          <b-form-input
            class="form__input"
            placeholder="10550594492"
            v-model.trim.lazy="$v.tcNumber.$model"
            type="number"
          />
        </div>
        <div v-if="!$v.tcNumber.required && $v.tcNumber.$anyDirty">
          *TC Number is required
        </div>
        <div v-if="!$v.tcNumber.$anyDirty && $v.tcNumber.checkTcNumber">
          *Please enter valid TC Number.
        </div>
      </div>

      <!-- Phone Number Label & Input -->
      <div>
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.phoneNumber.$error }"
        >
          <label class="form__label">Phone Number</label>
          <b-form-input
            placeholder="5321234545"
            class="form__input"
            v-model.trim.lazy="$v.phoneNumber.$model"
            @keyup.enter="setNextFocus"
          />
        </div>
        <div v-if="!$v.phoneNumber.required && $v.phoneNumber.$anyDirty">
          *Phone Number is required
        </div>
        <div v-if="!$v.phoneNumber.minLength || !$v.phoneNumber.maxLength">
          *Please enter valid Phone Number without starting with 0.
        </div>
      </div>

      <!-- Test Code Used For Seeing on Screen -->
      <!-- <div>
        <li v-for="(item, i) in $v.tcNumber" :key="i">
          {{ (item, i) }} : {{ item }}
        </li>
      </div> -->
    </b-row>
  </div>
</template>

<script>
import validationMixin from "@/mixins/validationMixin.js";

export default {
  name: "TheForm",
  props: ["formId", "people"],
  data() {
    return {
      firstName: null,
      lastName: null,
      age: null,
      hesCode: "",
      tcNumber: "",
      phoneNumber: null,
      email: null,
    };
  },
  mixins: [validationMixin],
  methods: {
    // sets focus on first items first input, firstname0 is the ref of first element
    setFocus() {
      this.$refs.firstName0.focus();
    },
    setNextFocus() {
      // this function used as sending data to parent, then used for focusing next items input
      this.$emit("setNextFocus", this.formId);
    },
  },
  mounted() {
    if (this.formId === 0) {
      this.setFocus();
    }
  },
};
</script>

<style scoped>
.form-group--error .form__input {
  border: 2px dotted red;
  border-radius: 5px;
}

.form__label {
  width: 10rem;
  font-weight: bold;
  vertical-align: middle;
}

/* Add a background color and some padding around the form */
.formContainer {
  border-radius: 2rem;
  background-color: #f2f2f2;
  padding: 20px;
}

.container {
  width: 25%;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
