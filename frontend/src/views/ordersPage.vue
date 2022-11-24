<script setup>
  import OrderCard from '../components/OrderCard.vue';
</script>

<template>
  <div class="sortDiv">
    <button v-on:click="sortCardDate">Järjestä päivämäärän perusteella</button>
  </div>
  <div class="sortDiv">
    <select class="form-select" id="statusCheck">
      <option>käsittelyssä</option>
      <option>lähetetty</option>
      <option>peruutettu</option>
    </select>
    <button v-on:click="bringCardStatus">Hae Status</button>
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

      console.log("This message is for test purposes")
    },
    methods: {
      sortCard: await function (event) {
        fetch("http://localhost:3000/findOrdersSortDate") //Haetaan orderDate 'desc' perusteella orderx.
          .then(res => res.json())
          .then(data => this.orders = data)
          .catch(err => this.error = err.message)
          console.log(this.orders);
      },
      bringCardStatus: await function (event) {
        let orderStatus = document.getElementById('statusCheck').value;
        //Suomesta englanniksi käännös tietokantahakua varten
        if (orderStatus == "käsittelyssä") {
          orderStatus = "In handling";
        }
        else if (orderStatus == "lähetetty") {
          orderStatus = "Dispatched";
        }
        else {
          orderStatus = "Cancelled";
        }
        fetch("http://localhost:3000/findOrdersStatus/" + orderStatus) //Haetaan parametreissa olevan ID:n perusteella tiedot tilauksesta.
          .then(res => res.json())
          .then(data => this.orders = data)
          .catch(err => this.error = err.message)
          console.log(this.orders);
      }
    }
  }
</script>