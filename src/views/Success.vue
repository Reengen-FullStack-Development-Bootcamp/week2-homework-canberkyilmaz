<!-- Success page, after payment user redirect here -->
<template>
  <div class="mainBox">
    <div class="container success-box">
      <div class="success-text">Payment Successful !</div>
      <div class="success-text">Have a wonderful holiday !</div>
      <div class="success-text">See you soon !</div>
      <div class="success-text">You will be redirect to home page</div>
    </div>
  </div>
</template>

<script>
export default {
  // after 5 seconds user redirect to home
  mounted() {
    setTimeout(() => {
      this.$router.push("/");
    }, 5000);
  },
};
</script>

<style scoped>
.success-box {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}
.success-text {
  font-size: 3rem;
  text-align: center;
  margin-top: 5rem;
  color: rgb(255, 255, 255);
}
.mainBox {
  height: 100vh;
  background-color: #8bc6ec;
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
}
</style>
