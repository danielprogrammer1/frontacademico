import Swall from "sweetalert2";
import axios from "axios";

export function mostraAlerta(titulo, icono, foco=''){
    if(foco!=''){
    document.getElementById(foco).focus();
    }

    Swall.fire({
        title:titulo,
        icon:icono,
        customClass:{confirmButton:'btn btn-primary', popup:'animated zoomIn'},
        buttonsStyling:false
    })
}

export function confirmar(urlConSlash, id, titulo, mensaje){
    var url = urlConSlash + id;
    const swalWithBootstrapButton = Swall.mixin({
        customClass:{confirmButton:'btn btn-success me-3', cancelButton:'btn btn-danger'}
    });

    swalWithBootstrapButton.fire({
        title:titulo,
        text:mensaje,
        icon:'question',
        showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'}).then((res)=>{
            if(res.isConfirmed){
                enviarSolicitud('DELETE',{id:id}, url, 'Eliminado con exito');
            }else{
                mostraAlerta('Operacion cancelada','info')
            }
        });
}

export function enviarSolicitud(metodo, parametros, url, mensaje){
    axios({
        method:metodo, 
        data:parametros, 
        url:url
    }).then(function(res){
        var estado = res.status;
        if(estado == 200){
            mostraAlerta(mensaje,'success');
            window.setTimeout(function(){
                window.location.href = '/'
            }, 1000);
        }else{
            mostraAlerta('No se pudo recuparar la respuesta','error')
        }
    
    }).catch(function(error){
        mostraAlerta('Servidor no disponible','error')
    });
}

