<template>
  <div>
    <div v-if="!$store.state.editarFormulario">
      <el-form :inline="true" :model="paciente">
        <el-form-item>
          <el-input
            size="small"
            placeholder="Please name"
            v-model="paciente.nombre"
            required
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            size="small"
            placeholder="Please lastname"
            v-model="paciente.apellido"
            required
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            size="small"
            placeholder="Please age"
            v-model="paciente.edad"
            required
          ></el-input>
        </el-form-item>

        <el-button @click="botonFormulario(paciente)" :plain="true"
          >Agregar</el-button
        >
      </el-form>
    </div>
    <div v-else>
      <el-form :inline="true" :model="pacienteEdicion">
        <el-form-item>
          <el-input
            size="small"
            placeholder="Please name"
            v-model.trim="pacienteEdicion.nombre"
            required
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            size="small"
            placeholder="Please lastname"
            v-model.trim="pacienteEdicion.apellido"
            required
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            size="small"
            placeholder="Please age"
            v-model.number="pacienteEdicion.edad"
            required
          ></el-input>
        </el-form-item>

        <el-button @click="botonConfirmarEdicion(pacienteEdicion)"
          >Confirmar</el-button
        >
        <el-button @click="CancelarEdicion()">Cancelar</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pacienteEdicion: Object,
  },
  data() {
    return {
      paciente: {
        nombre: "",
        apellido: "",
        edad: null,
      },
    };
  },
  methods: {
    botonFormulario(paciente) {
      if (
        paciente.nombre === "" ||
        paciente.apellido === "" ||
        paciente.edad === null
      ) {
        this.$message({
          showClose: true,
          message: "Los Campos Son Obligatorios",
          type: "error",
        });
        return;
      }
      this.$emit("botonFormulario", JSON.parse(JSON.stringify(paciente)));
      this.paciente = {
        nombre: "",
        apellido: "",
        edad: "",
      };
    },
    CancelarEdicion() {
      this.$store.state.editarFormulario = false;
    },
    botonConfirmarEdicion(pacienteEditado) {
      if (
        pacienteEditado.nombre === "" ||
        pacienteEditado.apellido === "" ||
        pacienteEditado.edad === ""
      ) {
        this.$message({
          showClose: true,
          message: "Los Campos Son Obligatorios",
          type: "error",
        });
        return;
      }
      this.$emit("pacienteEditado", pacienteEditado);
    },
  },
};
</script>