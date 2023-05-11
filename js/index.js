$(document).ready(function () {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(ObtenerLocalizacion);
    }else{
        alert("no autoriza");
    }
    
    function ObtenerLocalizacion(position){
        console.log(position.coords.latitude+" "+position.coords.longitude)
    
    
        $.get("https://api.open-meteo.com/v1/forecast?latitude="+position.coords.latitude+"&longitude="+position.coords.longitude+"&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m", function(data){
            console.log(data);
            $("#temperatura").html("Temperatura actual: "+data["current_weather"]["temperature"]+"°");
            console.log(data["current_weather"]["temperature"]);
        });
    }
});

$("#btnenviar").click(function(e){

    
    if(validaformulario()!= ""){
        swal("Error de Envio", validaformulario(), "warning");
    }else{
        swal("Datos enviados");
    }

    e.preventDefault();

});

function validaformulario() {
    var html = "";

    var nombre = $("#txtnombre").val();
    var ciudad = $("#cbxciudad").val();
    var contrasena = $("#txtcontrasena").val();

    if (nombre == "") {
        html += "- Debe ingresar un nombre \n";
    }

    if(validarCorreoElectronico($("#txtemail").val())==false){
        html += "- Debe Ingresar un correo Valido \n";
    }

    if (ciudad=="0") {
        html += "- Debe seleccionar una ciudad \n";
    }

    if (contrasena.length<8) {
        html += "- La contraseña debe contener mínimo 8 caracteres \n";
    }


    return html;
}

function validarCorreoElectronico(correo) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (regex.test(correo)) {
      return true; 
    } else {
      return false; // 
    }
  }