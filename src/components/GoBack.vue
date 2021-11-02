<template>
  <div class="go-back">
    <button class="btn btn-secondary" @click="goBack">Go Back</button>
    <!-- Button to go 1 route back -->
  </div>
</template>

<script>
export default {
  name: "GoBack",
  methods: {
    goBack() {
      return this.$router.go(-1);
      // 1 route back
    },
  },
};
</script>

<style>
.go-back {
  text-align: end;
}
button {
  border: 0;
  cursor: pointer;
}
</style>
