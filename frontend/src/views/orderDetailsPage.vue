<template>

    <div class="orderTitleWrapper">
      <h2 class="orderTitle1">Tilaus ID: {{id}}</h2>
      <h2 class="orderTitle2">Tilattu: {{details.orderDate}}</h2>
    </div>

    <div class="statusWrapper">
      <h3 class="statusTitle">Status: </h3>
      <h3 v-if="details.status == 'In handling'" class="statusName">Käsittelyssä</h3>
      <h3 v-if="details.status == 'Dispatched'" class="statusName">Lähetetty</h3>
      <h3 v-if="details.status == 'Cancelled'" class="statusName">Peruutettu</h3>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <div class="deliveryInfo">
          <h4>Toimitusosoite</h4>
          <p>{{details.firstName}} {{details.lastName}}</p>
          <p>{{details.deliveryAddress}} <br> {{details.deliveryPostalCode}} Kaupunki</p>
          <p v-if="details.phoneNumber">{{details.phoneNumber}}</p>
          <p v-else>N/A</p>
          <p>{{details.customerEmail}}</p>
        </div>
        <div class="orderCost">
          <h4>Hinta</h4>
          <p>Veroton hinta: {{(this.totalCost - this.totalVAT).toFixed(2)}} €</p>
          <p>ALV: {{this.totalVAT.toFixed(2)}} €</p>
          <p>Verollinen hinta: {{this.totalCost}} €</p>
          <p>Toimitus: 4.99 €</p>
          <p>Kokonaishinta: {{this.totalCost + 4.99}} €</p>
        </div>
        <div class="orderButtons">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Status
            </button>
            <ul class="dropdown-menu">
              <li><h6 class="dropdown-header">Valitse tilauksen status</h6></li>
              <li value="0"><a class="dropdown-item" @click="statusSelection($event.target.text)">Käsittelyssä</a></li>
              <li value="1"><a class="dropdown-item" @click="statusSelection($event.target.text)">Lähetetty</a></li>
              <li value="2"><a class="dropdown-item" @click="statusSelection($event.target.text)">Peruutettu</a></li>
            </ul>
          </div>
          <!-- Tämä nappi avaa Boostrap modal komponentin -->
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Poista Tilaus</button>
        </div>
      </div>
      
      <div class="col-lg-6">
        <h4>Tuotteet</h4>
        <div class="card" v-for='(product, index) in productDetails' :key="productDetails._id">
          <div class="card-body">
            <h5>{{product[0].productName}}</h5>
            <p>Luokka: {{product[0].productType}}</p>
            <p>Hinta: {{product[0].price}} €</p>
            <p v-if="this.VAT[index]">ALV: {{this.VAT[index].toFixed(2)}} €</p>
            <p>Määrä: {{details.products[index].quantity}}</p>
          </div>
        </div>
      </div>
    </div>


    <!-- Tähän alle tulee Bootstrap modal: -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel"><i class="bi bi-exclamation-triangle-fill"></i> Olet poistamassa tilausta</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Haluatko varmasti poistaa tämän tilauksen? Tätä toimintoa ei voi peruuttaa.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Peruuta</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="this.deleteOrder()">Poista Tilaus</button>
          </div>
        </div>
      </div>
    </div>
    
</template>


<script>

  export default{
    props: ['id'],  //Saamme yksittäisen tilauksen ID:n propsina (Tää saatta olla vähän turha, mutta antaa sen nyt olla tässä).
    
    
    data(){
      return{
        details: [],
        productDetails: [],
        VAT: [],
        totalVAT: 0,
        totalCost: 0,
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
          console.log(this.productDetails);
          this.calculateInfo();
      },
      async calculateInfo(){
        var i = 0;
        while(i < this.productDetails.length){
          this.totalCost += this.productDetails[i][0].price
          this.VAT[i] = this.productDetails[i][0].price * 0.24
          this.totalVAT += this.VAT[i]
          i++
        }
        console.log(this.VAT);
      },
      async statusSelection(e){
        console.log(e);
        var status;

        if(e == "Käsittelyssä"){
          status = "In handling"
        }
        else if(e == "Lähetetty"){
          status = "Dispatched"
        }
        else {
          status = "Cancelled"
        }
        
        fetch("http://localhost:3000/updateOrder/" + this.details._id + "/?status=" + status , {method: "PUT"})
        .then(res => res.json())
        .then(this.$router.go())
      },
      async deleteOrder(){
        console.log("This deletes the order")
        fetch("http://localhost:3000/deleteOrder/" + this.details._id , {method: "DELETE"})
        .then(res => res.json())
        .then(this.$router.go(-1))
      }
    }
  }
</script>