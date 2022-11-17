<template>
    <div class="orderTitleWrapper">
      <h2 class="orderTitle1">Tilaus ID: {{id}}</h2>
      <h2 class="orderTitle2">Tilattu: {{details.orderDate}}</h2>
    </div>
    <div class="statusWrapper">
      <h3 class="statusTitle">Status: </h3>
      <h3 v-if="details.status == 'In handling'" class="statusName">Käsittelyssä</h3>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <h4>Toimitusosoite</h4>
        <p>{{details.firstName}} {{details.lastName}}</p>
        <p>{{details.deliveryAddress}} <br> {{details.deliveryPostalCode}} Kaupunki</p>
        <p v-if="details.phoneNumber">{{details.phoneNumber}}</p>
        <p v-else>N/A</p>
        <p>{{details.customerEmail}}</p>
      </div>
      <div class="col-lg-6">
        <h4>Tuotteet</h4>
        <div class="card" v-for='(product, index) in productDetails' :key="productDetails._id">
          <div class="card-body">
            <h5>{{product[0].productName}}</h5>
            <p>Luokka: {{product[0].productType}}</p>
            <p>Hinta: {{product[0].price}} €</p>
            <p>ALV: {{product[0].price * 0.24}} €</p>
            <p>Määrä: {{details.products[index].quantity}}</p>
          </div>
        </div>
      </div>
    </div>
    
</template>


<script>

  export default{
    props: ['id'],  //Saamme yksittäisen tilauksen ID:n propsina.
    
    data(){
      return{
        details: [],
        productDetails: [],
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
          await fetch("http://localhost:3000/findOneOrders/" + this.$route.params.id) //Haetaan parametreissa olevan ID:n perusteella tiedot tilauksesta.
          .then(res => res.json())
          .then(data => this.details = data)
          .catch(err => this.error = err.message)
        this.getProductInfo()
      },
      async getProductInfo(){
          console.log("Getting products list for order " + this.details._id)
          console.log(this.details.products)
          var i = 0;
          while(i < this.details.products.length){
            await fetch("http://localhost:3000/findOneInventory/" + this.details.products[i].productID)
            .then(res => res.json())
            .then(data => this.productDetails[i] = data)
            .catch(err => this.error = err.message)
            i++
          }
          console.log(this.productDetails)
      }
    }
  }
</script>