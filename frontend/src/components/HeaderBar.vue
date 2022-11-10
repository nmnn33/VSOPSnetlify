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
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Hae tilauksia" aria-label="Search">
          <button class="btn btn-success" type="submit">Hae</button>
        </form>
        <button class="btn btn-danger">Kirjaudu Ulos</button>
      </div>
    </div>
  </nav>
</template>

