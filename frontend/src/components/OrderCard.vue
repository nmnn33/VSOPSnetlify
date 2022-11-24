<template>
  <div class="card">
      <div class="card-body">
        <h5 class="card-title card-id">Tilaus ID: {{orders._id}}</h5>
        <h5 class="card-title card-status" style="color:orange" v-if="orders.status == 'In handling'">Käsittelyssä</h5>
        <h5 class="card-title card-status" style="color:green" v-if="orders.status == 'Dispatched'">Lähetetty</h5>
        <h5 class="card-title card-status" style="color:red" v-if="orders.status == 'Cancelled'">Peruutettu</h5>
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
</template>

<script>
  export default{
    props: {
      orders: Object
    }
  }
</script>