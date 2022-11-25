<script setup>
  import OrderCard from '../components/OrderCard.vue';
</script>

<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <button v-on:click="sortCardDate" class="btn btn-secondary">Järjestä päivämäärän perusteella</button>
    </div>
    <span class="input-group-text">&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <select class="form-control" id="statusCheck">
        <option value="" selected disabled hidden>Valitse status</option>
        <option>käsittelyssä</option>
        <option>lähetetty</option>
        <option>peruutettu</option>
      </select>
      <button v-on:click="bringCardStatus" class="btn btn-primary">Hae Status</button>
  </div>
  <br>
  <div v-if="orders" class="row">
      <!-- Jokaista tilausta kohden tehään OrderCard kompnentti -->
      <div class="col-sm-6" v-for="order in orders">
        <OrderCard :key="orders._id" :orders="order" />
      </div>
  </div>
  <div v-if="!orders.length" class="eiTuloksia">
    <h1>Ei löydy tilauksia tietokannasta.</h1>
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
      sortCardDate: await function (event) {
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