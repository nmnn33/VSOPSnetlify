<script setup>
  import OrderCard from '../components/OrderCard.vue';
</script>

<template>
    <div class="row">
        <div class="col-lg-6 homeWrapper">
            <div class="homeTitle">
                <h1>Tervetuloa Käyttäjä!</h1>
                <p>VSOPS - Very Simple Order Prosessing System</p>
            </div>
        </div>
        <div class="col-lg-6">
            <h2>Viimeisimmät tilaukset: </h2>
            <!-- Jokaista tilausta kohden tehään OrderCard kompnentti -->
            <OrderCard v-for="order in orders" :key="orders._id" :orders="order" />
        </div>
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
    created(){
        fetch("http://localhost:3000/findOrdersSortDate") //Haetaan orderDate 'desc' perusteella orderx.
          .then(res => res.json())
          .then(data => this.orders = data.slice(0, 4))
          .catch(err => this.error = err.message)
          console.log(this.orders);
    }
}
</script>