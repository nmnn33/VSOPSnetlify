<script setup>
  import HeaderBar from './components/HeaderBar.vue';
  import OrderCard from './components/OrderCard.vue';


</script>

<template>
  <div class="container">
    <HeaderBar />

    <div class="row">
        <OrderCard v-for="order in orders" :key="orders._id" :orders="order" />
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        orders: []
      }
    },
    mounted(){
      fetch("http://localhost:3000/findOrders") //Testausta varten hakee localhostin kautta. Kannattaa myöhemmin muuttaa.
      .then(res => res.json())
      .then(data => this.orders = data)
      .catch(err => console.log(err.message))
    }
  }
</script>