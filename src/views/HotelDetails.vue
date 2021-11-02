<template>
  <div class="mt-4">
    <div class="container">
      <GoBack />
      <h1 class="title">
        {{ hotel.name }}
      </h1>
      <div class="row align-items-start">
        <div class="hotels mb-3 mb-lg-0 col-lg-8">
          <!-- CAROUSEL START -->
          <div class="container">
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <!-- Text slides with image -->
              <b-carousel-slide
                v-for="(img, i) in hotel.images"
                :key="img"
                :img-src="require(`@/assets/${hotel.images[i]}`)"
              ></b-carousel-slide>
            </b-carousel>
          </div>

          <!-- CAROUSEL END -->
        </div>
        <div class="sticky p-lg-0 col-lg-4 book-section">
          <!-- Book Now Button -->
          <h2>Book Now</h2>
          <!-- Date Picker For Check In -->
          <div>
            <label for="checkInDate">Check In</label>
            <b-form-datepicker
              id="checkIn"
              v-model="checkInDate"
              class="mb-2"
              :min="this.now"
            ></b-form-datepicker>
          </div>
          <!-- Date Picker For Check Out Disabled -->

          <div v-if="!this.checkInDate">
            <label for="checkOutDate">Check Out</label>
            <b-form-datepicker disabled class="mb-2"></b-form-datepicker>
          </div>
          <!-- Date Picker For Check Out (This will be active if Check In Date is chosen) -->
          <div v-if="this.checkInDate">
            <label for="checkOutDate">Check Out</label>
            <b-form-datepicker
              id="checkOut"
              v-model="checkOutDate"
              class="mb-2"
              :min="this.checkInDate"
            ></b-form-datepicker>
          </div>
          <!-- People count / also used for calculating hotel price -->
          <div class="people-container text-align mb-3">
            <label class="people-label" for="rooms">People:</label>
            <input
              class="people-input"
              :people="people"
              v-model="people"
              disabled
            />
            <div>
              <!-- - Button only visible if people > 0 -->
              <button
                v-if="people > 0"
                class="people-btn mr-2"
                @click="people--"
              >
                -
              </button>
              <button class="people-btn" @click="people++">+</button>
            </div>
          </div>
          <!-- If dates and people not chosen this h3 text will shown -->
          <div v-if="!totalPayment">
            <h3>Choose Date and People to see the price.</h3>
          </div>
          <!-- If there is totalPayment, it will be shown -->
          <div class="totalPayment" v-if="totalPayment">
            Total Payment: ${{ totalPayment }}
          </div>
          <div class="bookNow d-flex align-center justify-content-center">
            <!-- If there is totalPayment Book Now button will shown -->
            <button v-if="totalPayment">
              <router-link
                :to="{
                  name: 'Reservation',
                  params: {
                    peopleCount: this.people,
                    totalPayment: this.totalPayment,
                  },
                }"
                >Book Now</router-link
              >
            </button>
          </div>
        </div>
        <div>
          <!-- Hotel Info Section -->
          <div class="hotel-details text-center">
            <b-badge class="rating" variant="primary">
              Rating: <b-badge variant="light">{{ hotel.rating }}</b-badge>
            </b-badge>
            <div class="h1 mt-5">
              {{ hotel.locationCity }} / {{ hotel.locationCountry }}
            </div>
            <div class="d-flex align-leftcontainer mr-4 ml-4 p-5 text-left">
              {{ hotel.summary }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Importing
import data from "@/data.json";
import validationMixin from "@/mixins/validationMixin.js";
import GoBack from "@/components/GoBack.vue";

// Component Data
export default {
  name: "hotelDetails",
  components: { GoBack },
  mixins: [validationMixin],
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {
      // Hotel Info Base Values
      hotelId: this.$route.params.id,
      checkInDate: null,
      checkOutDate: null,
      people: 0,
      slide: 0,
      minDate: null,
    };
  },

  computed: {
    hotel() {
      // According to this return true data will shown
      return data.hotels.find((hotel) => hotel.id === this.hotelId);
    },
    totalPayment() {
      // total payment calculated
      return (
        this.calculateDays(this.checkInDate, this.checkOutDate) *
        this.people *
        this.hotel.price
      );
    },
    now() {
      // todays date returned to disable dates before today on datepicker
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    },
  },
  methods: {
    // stay dates calculated with this function 86400000 is the 1 day in milliseconds
    calculateDays(day1, day2) {
      const checkIn = Date.parse(day1);
      const checkOut = Date.parse(day2);
      return (checkOut - checkIn) / 86400000;
    },
    // Carousel methods
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    // Function used to redirect to /reservation with peopleCount data.
    sendToForm() {
      this.$router.push({
        name: " Reservation",
        params: {
          peopleCount: this.people,
        },
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}

.title {
  margin-bottom: 30px;
}

.experiences {
  padding: 40px 0;
}
.hotel {
  display: flex;
  justify-content: space-between;
}
p {
  margin: 0 40px;
  font-size: 20px;
  text-align: center;
}
.cards {
  display: flex;
  justify-content: space-between;
}
.cards img {
  max-height: 200px;
}
.card {
  padding: 0 20px;
  position: relative;
}
.card__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
}

.people-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.people-btn {
  background-color: #2c5dff;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 32px;
  width: 2rem;
}

.people-label {
  margin: 0;
}

.totalPayment {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  border: 1px solid black;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
}
.bookNow {
  font-size: 1.5rem;
  color: #2c3e50;
}

.bookNow:hover {
  font-size: 2rem;
  color: #2c3e50;
}

.people-input {
  width: 3rem;
  text-align: center;
}

.rating {
  font-size: 1.2rem;
  margin-top: 1rem;
}
</style>
