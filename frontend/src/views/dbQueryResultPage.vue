<template>
  <div v-for="orders in orders">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Tilaus ID: {{orders._id}}</h5>
        <div class="card-content">
          <p class="card-text">
            Tilaus pvm: {{orders.orderDate}} <br>
            Asiakkaan nimi: {{orders.firstName}} {{orders.lastName}} <br>
            Puhelin: {{orders.phoneNumber}} <br>
            Sähköposti: {{orders.customerEmail}}
          </p>
          <!-- Alla pistetään Vue Router Linkki tilaustiedot sivulle. Sille syötetään parametrina yksittäisen tilauksen ID -->
          <RouterLink :to="{ name: 'Order Details', params: {id: orders._id}}" class="btn btn-primary orderCardBtn"><i class="bi bi-eye-fill"></i> Info</RouterLink>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  export default{
    props: ['firstName'],  //Saamme yksittäisen tilauksen ID:n propsina.
    
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