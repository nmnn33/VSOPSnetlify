<script setup>
  import OrderCard from '../components/OrderCard.vue';
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
      <button v-on:click="sortCardDate" class="sortBtn">Järjestä päivämäärän perusteella</button>
      </div>
      <div class="col-sm">
        <select class="form-select statusForm" id="statusCheck">
          <option>käsittelyssä</option>
          <option>lähetetty</option>
          <option>peruutettu</option>
        </select>
      </div>
      <div class="col-sm">
        <button v-on:click="bringCardStatus">Hae Status</button>
      </div>
    </div>
  </div>
  <OrderCard v-for="order in orders" :key="orders._id" :orders="order" />
</template>

<script>
  export default{
    props: ['firstName'],  //Saamme yksittäisen tilauksen firstName:n propsina.
    
    data(){
      return{
        orders: [],
        error: []
      }
    },
    created() {
        this.$watch(    //Täällä kohtaa tehdään uusi tietokantahaku, mutta se tehdään vasta kun näkymä on latautunut.
            () => this.$route.params,
            () => {
              this.getInfo()
            },
            { immediate: true }
        )
    },
    methods: {
      async getInfo(){
          await fetch("http://localhost:3000/findOneOrdersName/" + this.$route.params.firstName) //Haetaan parametreissa olevan ID:n perusteella tiedot tilauksesta.
          .then(res => res.json())
          .then(data => this.orders = data)
          .catch(err => this.error = err.message)
          console.log(this.orders);
      },
      sortCardDate: await function (event) {
        fetch("http://localhost:3000/findOneOrdersNameSort/" + this.$route.params.firstName) //Haetaan parametreissa olevan ID:n perusteella tiedot tilauksesta.
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

/* vanhaa tietoa varmuuden vuoksi taltioitu!
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
  };*/
</script>