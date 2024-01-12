<template>
    <div class="row mt-5">
      <div class="col-lg-8 offset-lg-2">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Registro</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">
            <tr v-if="this.cargando">
              <td colspan="6"><h3>Cargando...</h3></td>
            </tr>
            <tr v-else v-for="est, i in this.estudiantes" :key="est.id">
              <td v-text="(i + 1)"></td>
              <td v-text="est.id"></td>
              <td>
                <img v-if="est.foto" style="width: 150px !important;" :src="est.foto" class="img-thumbnail" alt="foto">
                <img v-else style="width: 150px !important;" src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/30.User-256.png" class="img-thumbnail" alt="foto">
              </td>
              <td v-text="est.nombre"></td>
              <td v-text="est.apellido"></td>
              <td v-text="new Date(est.created_at).toLocaleDateString()"></td>
              <td>
                <router-link :to="{path:'viewE/'+est.id}" class="btn btn-info">
                  <i class="fa-solid fa-eye"></i>
                </router-link>
                &nbsp;
                <router-link :to="{path:'editE/'+est.id}" class="btn btn-warning">
                  <i class="fa-solid fa-edit"></i>
                </router-link>
                &nbsp;
                <button class="btn btn-danger" v-on:click="eliminar(est.id, est.nombre)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import {confirmar} from '../funciones'

export default{
  data(){
    return{
      estudiantes:null,
      cargando:false
    }
  },
  mounted(){
    this.getEstudiantes()
  },
  methods:{
    getEstudiantes(){
      this.cargando = true
      axios.get('http://academicobackend.test:90/api/v1/estudiantes').then(
        res =>{
          this.estudiantes = res.data;
          this.cargando = false;
        }
      );
    },
    eliminar(id, nombre){
      confirmar('http://academicobackend.test:90/api/v1/estudiantes/', id, 'Eliminar registro', 'Se eliminara '+nombre);
      this.cargando = false;
    }
  }
}
</script>
