<template>
  <!-- Navigations are write here together. -->

  <b-nav
    id="nav"
    class="container navbar navbar-expand-lg ftco-navbar-light d-flex"
  >
    <!-- basic logo with routing -->
    <router-link class="logo" to="/">
      <div class="align-middle text-center">Hotel App</div></router-link
    >
    <div class="container"></div>
    <ul class="nav-links align-items-center">
      <li class="links">
        <!-- home routing -->
        <router-link to="/">Home</router-link>
      </li>
      <b-nav-item-dropdown class="links" text="Hotels" right>
        <!-- hotels routing with for loop -->
        <b-dropdown-item
          v-for="hotel in hotels"
          :key="hotel.name"
          class="links d-flex align-items-center"
        >
          <router-link
            :to="{
              name: 'HotelDetails',
              params: { id: hotel.id },
            }"
            >{{ hotel.name }}</router-link
          >
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </ul>
  </b-nav>
</template>

<script>
// data.json file imported
import data from "@/data.json";

export default {
  name: "TheNavigation",
  data() {
    return {
      hotelId: this.$route.params.id,
      hotelName: this.$route.params.name,
      hotels: data.hotels,
    };
  },
};
</script>

<style scoped>
#nav {
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0;
  background-color: white;
  border-bottom: 1px solid grey;
  position: sticky;
  z-index: 999;
  padding: 0;
}

#nav a.router-link-exact-active {
  color: #003274;
}
.nav-links {
  display: flex;
}
.links {
  list-style: none;
  font-size: 2rem !important;
}
.links:hover {
  text-decoration: underline;
}
.logo {
  font-size: 2rem;
  font-weight: bold;
}
.container {
  width: 100%;
  padding-right: 15 px;
  padding-left: 15 px;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
}
</style>
