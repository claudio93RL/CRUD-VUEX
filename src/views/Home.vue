<template>
  <el-container>
    <el-header>
      M&oacute;dulo ajustes
      <el-button
        type="info"
        icon="el-icon-back"
        circle
        @click="logout"
        title="logout"
      ></el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-menu"></i>Men&uacute;</template
            >
            <el-submenu index="1-4">
              <template slot="title">Usuarios</template>
              <el-menu-item index="1-4-1">Mantenedor</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <Formulario
          @botonFormulario="newPacient"
          :pacienteEdicion="paciente"
          @pacienteEditado="pacienteEditado"
        />
        <TablaPacientes
          :paciente="$store.state.lista"
          @edit="editIndexPacient"
          @delete="deleteIndexPacient"
        >
        </TablaPacientes>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import TablaPacientes from "../components/TablaPacientes.vue";
import Formulario from "../components/Formulario.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      paciente: {},
    };
  },
  components: {
    TablaPacientes,
    Formulario,
  },
  methods: {
    logout() {
      this.$router.push("login");
    },
    async editIndexPacient(index) {
      this.$store.state.editarFormulario = true;
      this.paciente = { ...index };
    },
    deleteIndexPacient(index) {
      this.deletePatient(index);
      console.log(index);
    },
    newPacient() {},
    pacienteEditado(e) {
      this.updatePatient(e);
      this.$store.state.editarFormulario = false;
    },
    ...mapActions([
      "traerLosUsuarios",
      "newPacient",
      "deletePatient",
      "cargarEdicion",
      "updatePatient",
    ]),
  },
  computed: {},
  mounted() {
    this.traerLosUsuarios();
  },
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-button {
  float: right;
  margin-top: 10px;
}
.el-aside {
  color: #333;
}
</style>