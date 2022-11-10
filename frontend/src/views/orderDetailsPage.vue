<template>
    <h1>Tilaus ID: {{id}}</h1>
    <p>{{details.firstName}} {{details.lastName}}</p>
</template>


<script>

  export default{
    props: ['id'],
    
    data(){
      return{
        details: [],
        error: []
      }
    },
    created() {
        this.$watch(    //Täällä kohtaa tehdään uusi tietokantahaku, mutta se tehdään vasta kun näkymä on latautunut.
            () => this.$route.params,
            () => {
                fetch("http://localhost:3000/findOneOrders/" + this.$route.params.id) //Haetaan propsina saadun ID:n perusteella tiedot tilauksesta.
                .then(res => res.json())
                .then(data => this.details = data)
                .catch(err => this.error = err.message)
            },
            { immediate: true }
        )
    }
  }

  console.log(['id']);
</script>