<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand text-white" to="/">VSOPS</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link text-white" to="/">Aloitus</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-white" to="/tilaukset">Tilaukset</RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Varasto</a>
          </li>
        </ul>
        <form class="d-flex" role="search" @submit.prevent="dbQuery"> <!--@submit-prevent estää sivua päivittymästä kun tehdään submit, käynnistetään funktio dbQuery()-->
          <select class="form-control form-control-sm" id="navbarSelect">
            <option>Tilaukset</option>
            <option>Varastotuote</option>
          </select>
          <input class="form-control me-2" type="search" placeholder="Hae tilauksia" aria-label="Search" id="navSearch" required>
          <button class="btn btn-success" type="submit">Hae</button>
        </form>
        <button class="btn btn-danger" id="kirjautuminenBtn">Kirjaudu Ulos</button>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
        name : 'getOneOrder',
        methods : {
           async dbQuery(e) {
            if (document.getElementById('navbarSelect').value == "Tilaukset") {
              const queryStr = document.getElementById('navSearch').value;
              const completeStr = queryStr.charAt(0).toUpperCase() + queryStr.slice(1).toLowerCase(); //Muuttaa eka kirjain aina isoksi ja loput pieniksi, helpottaa hakua!
              document.getElementById('navSearch').value = "";
              this.$router.push({name: "dbQueryResult", params: {firstName: completeStr}}); //Siirtyy sivulle
            }
            else if (document.getElementById('navbarSelect').value == "Varastotuote") {
              console.log("Varastotuotteet");
            }
            else {
              console.log("jotain meni pieleen...");
            }
          }
        }
  };
</script>
