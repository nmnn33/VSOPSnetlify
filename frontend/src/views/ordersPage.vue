<script setup>
  import OrderCard from '../components/OrderCard.vue';
</script>

<template>
  <div class="sortDiv">
    <button v-on:click="sortCard">Järjestä päivämäärän perusteella</button>
  </div>
  <div v-if="orders" class="row">
      <!-- Jokaista tilausta kohden tehään OrderCard kompnentti -->
      <OrderCard v-for="order in orders" :key="orders._id" :orders="order" />
  </div>
</template>

<script>
  export default {
    data(){
      return{
        orders: [],
        error: []
      }
    },
    mounted(){
      fetch("http://localhost:3000/findOrders") //Testausta varten hakee localhostin kautta. Kannattaa myöhemmin muuttaa.
      .then(res => res.json())
      .then(data => this.orders = data)
      .catch(err => this.error = err.message)
    },
    methods: {
      sortCard: await function (event) {
        fetch("http://localhost:3000/findOrdersSortDate") //Haetaan orderDate 'desc' perusteella orderx.
          .then(res => res.json())
          .then(data => this.orders = data)
          .catch(err => this.error = err.message)
          console.log(this.orders);
      }
    }
  }
</script>