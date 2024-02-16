//
$(document).ready(function () {
  //   let input = $("#input");
  //   let boton = $("#boton");
  //   let msj3 = document.querySelector(".msj3"); //se usa clase porque chocaba con bootstrap

  //   //boton con metodo(addEventListener) y evento(click) con funcion con nombre(validacion) integrada
  //   boton5.addEventListener("click", function validacion() {
  //     let capturarInput5 = input5.value;
  //     let patronBusqueda = /[a-zA-Z]/gim;
  //     if (capturarInput5.match(patronBusqueda)) {
  //       msj3.innerHTML = `palabra permitida: ${capturarInput5}`;
  //     } else {
  //       alert("error, palabra no permitida");
  //     }
  //   });

  $.ajax({
    url: "https://akabab.github.io/superhero-api/api/all.json",
    type: "GET",
    datatype: "json",
    success: function (DatosAPI) {
      DatosAPI.forEach(function (element) {
        let espacio = $("<hr>");
        $("#api").append(espacio);

        //se obtiene ID del heroe
        const IDHero = $("<p>").text(element.id);
        $("#api").append(IDHero);

        //se obtiene nombre del heroe
        const NombreHero = $("<p>").text(element.name);
        $("#api").append(NombreHero);

        //se obtiene imagen del heroe
        const ImagenHero = $("<img>").attr("src", element.images.md);
        $("#api").append(ImagenHero);

        //se obtiene conexiones del heroe
        const ConexionesHeroe = $("<p>").text(
          element.connections.groupAffiliation
        );
        $("#api").append(ConexionesHeroe);

        //se obtiene primera publicacion del heroe
        const PublicacionHero = $("<p>").text(element.biography.publisher);
        $("#api").append(PublicacionHero);

        //se obtiene ocupacion del heroe
        const OcupacionHero = $("<p>").text(element.work.occupation);
        $("#api").append(OcupacionHero);

        //se obtiene superpoder del heroe
        const PrimeraAparicion = $("<p>").text(
          element.biography.firstAppearance
        );
        $("#api").append(PrimeraAparicion);

        //se obtiene altura del heroe
        const AlturaHero = $("<p>").text(element.appearance.height);
        $("#api").append(AlturaHero);

        //se obtiene peso del heroe
        const PesoHero = $("<p>").text(element.appearance.weight);
        $("#api").append(PesoHero);

        //se obtiene alianzas del heroe
        const AliasHeroe = $("<p>").text(element.biography.aliases);
        $("#api").append(AliasHeroe);
      });
    },
  });
});
