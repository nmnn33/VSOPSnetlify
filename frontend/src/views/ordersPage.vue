<script setup>
  import OrderCard from '../components/OrderCard.vue';


</script>

<template>
    <div v-if="orders" class="row">
        <OrderCard v-if="orders" v-for="order in orders" :key="orders._id" :orders="order" />
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