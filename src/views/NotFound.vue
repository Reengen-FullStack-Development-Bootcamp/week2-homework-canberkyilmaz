<!-- Not Found Page  -->

<template>
  <div class="container text-center mt-4">
    <h1>Not Found</h1>
    <p>
      We couldn't find that page. Try going
      <router-link :to="{ name: 'Home' }">Home</router-link>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
