<template>
  <div class="container">
    <el-table
      v-loading="$store.state.spinnig"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="paciente"
      stripe
      style="width: 100%"
    >
      <el-table-column type="index" label="#" width="50"> </el-table-column>
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="nombre" label="Nombre" width="180">
      </el-table-column>
      <el-table-column prop="apellido" label="Apellido"> </el-table-column>
      <el-table-column prop="edad" label="Edad"> </el-table-column>
      <el-table-column label="Operaciones">
        <template slot-scope="scope">
          <el-button
            :disabled="$store.state.editarFormulario"
            size="mini"
            @click="handleEdit(scope.row)"
            >Editar</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >Eliminar</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Boton from "./Boton.vue";
export default {
  components: {
    Boton,
  },
  props: {
    paciente: Array,
  },
  data() {
    return {
      desactivar: null,
    };
  },
  methods: {
    handleEdit(index) {
      this.$emit("edit", index);
    },
    handleDelete(index) {
      this.$emit("delete", index);
    },
  },
  computed: {},
};
</script>