$(document).ready(function () {
  //ejercicio 5 validacion de un input
  let formularioDatos = $("#formularioDatos");
  formularioDatos.submit(function (event) {
    let input = $("#input");
    let idValue;

    event.preventDefault();

    input.filter(function () {
      let value = $(this).val();
      let pattern = /^(?:[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|732)$/;

      if (value.match(pattern)) {
        idValue = value; // Guarda el valor validado
      } else {
        alert("busqueda invalida");
        $("#input").val("");
      }
    });

    if (idValue) {
      //Realiza la nueva solicitud AJAX con el ID específico
      $.ajax({
        url: `https://www.superheroapi.com/api.php/3525635500807579/${idValue}`,
        type: "GET",
        datatype: "json",
        success: function (DatosAPI) {
          // Limpiar busqueda anterior
          $("#api").empty();
          $("#input").val("");

          let hero = `
          <h3 class="text-center">SuperHero Encontrado</h3>
          <div class="card mb-4">
              <div class="row">
                  <div class="col-md-3 mx-4 my-3">
                      <img src="${
                        DatosAPI.image.url
                      }" class="card-img" alt="" />
                  </div>
                  <div class="col-md-8">
                      <div class="card-body ml-0 pl-0">
                          <h5 class="card-title"> <span class="fw-bold">Nombre:</span> ${
                            DatosAPI.name
                          } </h5>
                          <p class="card-text">
                          <span class="fw-bold">Conexiones: </span>${
                            DatosAPI.connections["group-affiliation"]
                          }
                          </p>
                          <ul class="list-group">
                              <li class="list-group-item">
                                  <em class="fw-bold">Publicado por </em>: ${
                                    DatosAPI.biography.publisher
                                  }
                              </li>
                              <li class="list-group-item">
                                  <em class="fw-bold">Ocupación: </em>${
                                    DatosAPI.work.occupation
                                  } 
                              </li>
                              <li class="list-group-item">
                              <em class="fw-bold">Primera Aparición: </em>
                                      ${DatosAPI.biography["first-appearance"]}
                              </li>
                              <li class="list-group-item">
                                  <em class="fw-bold">Altura: </em>${DatosAPI.appearance.height.join(
                                    " - "
                                  )}
                              </li>
                              <li class="list-group-item">
                              <em class="fw-bold">Peso: </em>${DatosAPI.appearance.weight.join(
                                " - "
                              )}
                              </li>
                              <li class="list-group-item">
                                  <em class="fw-bold">Aliases: </em>${
                                    DatosAPI.biography.aliases
                                  }
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>`;
          $("#api").append(hero);

          let Estadisticas = [];
          for (let key in DatosAPI.powerstats) {
            Estadisticas.push({ label: key, y: DatosAPI.powerstats[key] });
          }

          let opcion = {
            title: {
              text: `Estadísticas de Poder: ${DatosAPI.name}`,
            },
            data: [
              {
                type: "pie",
                startAngle: 45,
                showInLegend: "true",
                legendText: "{label}",
                indexLabel: "{label} ({y})",
                yValueFormatString: "#,##0.#" % "",
                dataPoints: Estadisticas,
              },
            ],
          };
          $("#chartContainer").CanvasJSChart(opcion);
        },
        error: function () {
          alert("Error al obtener datos del SuperHero");
        },
      });
    }
  });
});
