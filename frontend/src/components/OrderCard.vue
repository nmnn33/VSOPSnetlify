<template>
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
          <RouterLink :to="{ name: 'Order Details', params: {id: orders._id}}" class="btn btn-primary orderCardBtn" :orders="this.orders"><i class="bi bi-eye-fill"></i> Info</RouterLink>
        </div>
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