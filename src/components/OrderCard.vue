<template>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Order ID: {{orders._id}}</h5>
        <div class="card-content">
          <p class="card-text">
            Order Date: {{orders.orderDate}} <br>
            Customer Name: {{orders.firstName}} {{orders.lastName}} <br>
            Phone: {{orders.phoneNumber}} <br>
            Email: {{orders.customerEmail}}
          </p>
          <a href="#" class="btn btn-primary orderCardBtn"><i class="bi bi-eye-fill"></i> Info</a>
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