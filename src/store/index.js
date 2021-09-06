import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

const UsuariosAxios = Axios.create({
  baseURL: 'http://localhost:3000/api',
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lista: [],
    editarFormulario: false,
    spinnig: false
  },
  mutations: {
    SET_LIST(state, nuevaLista) {
      state.lista = nuevaLista
    },
    ADD_NEW_PATIENT(state, payload) {
      state.lista.push(payload)
    },
    DELETE_PATIENT(state, payload) {
      state.lista.splice(payload, 1)
    },
    UPDATE_PATIENT(state, payload) {
      const pacienteEditado = state.lista.findIndex(item => item.id === payload.id)
      state.lista[pacienteEditado].nombre = payload.nombre;
      state.lista[pacienteEditado].apellido = payload.apellido;
      state.lista[pacienteEditado].edad = payload.edad;
    }
  },
  actions: {
    async traerLosUsuarios(context) {
      try {
        const UsuariosResponse = await UsuariosAxios.get('http://localhost:3000/api/pacientes')
        context.commit('SET_LIST', UsuariosResponse.data)
      } catch (e) {
        console.error(e)
      }
    },
    newPacient(context, paciente) {
      try {
        Axios.post('pacientes', paciente)
          .then(res => {
            context.commit('ADD_NEW_PATIENT', res.data)
          })
      } catch (error) {
        console.log(error);
      }
    },
    deletePatient(context, index) {
      try {
        Axios.delete(`/pacientes/${index}`)
          .then(res => {
            console.log(index);
            if (res.status === 200) {
              const pacienteEliminado = context.state.lista.findIndex(item => item.id === res.data.id)
              context.commit('DELETE_PATIENT', pacienteEliminado)
            }
          })
      } catch (error) {
        console.log(error);
      }
    },
    updatePatient(contex, patient) {
      const id = patient.id
      Axios.put(`pacientes/${id}`, patient)
        .then(res => {
          if (res.status === 200) {
            contex.state.spinnig = true
            setTimeout(() => {
              contex.commit("UPDATE_PATIENT", res.data)
              contex.state.spinnig = false
            }, 2000)
          }
        })
    }
  }
})
