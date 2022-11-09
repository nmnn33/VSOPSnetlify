<script setup>
  import OrderCard from '../components/OrderCard.vue';
</script>

<template>
  <form class="d-flex" role="search" @submit.prevent="dbQuery"> <!--@submit-prevent estää sivua päivittymästä kun tehdään submit, käynnistetään funktio dbQuery()-->
          <select class="form-control form-control-sm" id="navbarSelect1">
            <option>Tilaukset</option>
            <option>Varastotuote</option>
          </select>
          <input class="form-control me-2" type="search" placeholder="Hae tilauksia" aria-label="Search" id="navSearch1" required>
          <button class="btn btn-success" type="submit">Hae</button>
  </form>
    <div v-if="orders" class="row">
        <OrderCard v-for="order in orders" :key="orders._id" :orders="order" />
    </div>
</template>

<script>
  export default {
        name : 'getOneOrder',
        data (){
            return {
                orders: []
            }
        },
        methods : {
           async dbQuery(e) {
            if (document.getElementById('navbarSelect1').value == "Tilaukset") {
              const response =  await fetch("http://localhost:3000/findOneOrders/" + document.getElementById('navSearch1').value);
              const data = await response.json();
              const arrayMuoto = [data]; //Tämä kohta on tarpeen, sillä response antaa Object, ja jotta v-for toimii pitää olla array. Tässä on array, jossa on vain 1 objekti.
              this.orders = arrayMuoto;
              console.log(arrayMuoto);
              document.getElementById('navSearch1').value = "";
            }
            else if (document.getElementById('navbarSelect1').value == "Varastotuote") {
              console.log("Varastotuotteet");
            }
            else {
              console.log("jotain meni pieleen...");
            }
          }
        },
        updated(){
          this.dbQuery();
        }
  };
</script>