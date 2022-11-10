<script setup>
  import OrderCard from '../components/OrderCard.vue';
</script>

<template>
    <div v-if="this.orders" class="row">
        <!-- Jokaista tilausta kohden tehään OrderCard kompnentti -->
        <OrderCard v-for="order in orders" :key="orders._id" :orders="order" />
    </div>
    <div v-else-if="this.error">
      <h1>Tilauksia ei nyt pystytä hakemaan.</h1>
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
    }
  }
</script>