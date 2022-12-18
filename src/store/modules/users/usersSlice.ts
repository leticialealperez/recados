// REFLEXÃO - o dado que vou manipular/representar de forma global neste reducer é uma lista?
// SIM - precisa de um adapter
// NAO - um slice serve

// adapter - gerenciador da entidade (user, recados...)
// slice = (reducer + action), gerenciador do estado users, recados
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { ApiRequest } from '../../../services/api';


export interface Recado {
    id: string;
    description: string;
    detail: string;
}

export interface User {
    name: string;
    email: string;
    password: string;
    recados: Recado[];
}

export interface UpdateUser {
  email: string;
  recados: Recado[]
}

const userAdapter = createEntityAdapter<User>({
    selectId: (user) => user.email,
})

export const { selectAll: selectUsers, selectById:selectUsersByEmail } = userAdapter.getSelectors(
    (state: RootState) => state.users
);

// createAsyncThunk - users
// buscar todos os usuarios
export const buscarUsuariosAPI = createAsyncThunk('users/getUsers', async () => {
  const respostaApi = await ApiRequest.get('/users')

  console.log(respostaApi);

  const dataParsed = JSON.parse(respostaApi.data);

  return dataParsed;
});

// criar um novo usuario
export const adicionarNovoUsuarioAPI = createAsyncThunk('user/addUser', async(newUser: User) => {
  const respostaApi = await ApiRequest.post('/users', JSON.stringify(newUser));

  const dataParsed = JSON.parse(respostaApi.data);

  return dataParsed;
})

// atualizar recados de um usuario
export const atualizarRecadosAPI = createAsyncThunk('user/updateRecados', async (novosDados: UpdateUser) => {
  const respostaApi = await ApiRequest.put(`/users/${novosDados.email}`, JSON.stringify(novosDados.recados))

  const dataParsed = JSON.parse(respostaApi.data);

  return dataParsed;

})


// quando utilizamos o adapter é ele quem define o initial state
const userSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState({
    success: false,
    mensagem: ''
  }),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(buscarUsuariosAPI.fulfilled, (state, action) => {
      /*
       payload => { ok: true, mensagem: 'Deu certo', dados: []}
      */
      state.success = action.payload.ok;
      state.mensagem = action.payload.mensagem;
      userAdapter.setAll(state, action.payload.dados);
    });
    builder.addCase(adicionarNovoUsuarioAPI.fulfilled, (state, action) => {
      /*
       payload => { ok: true, mensagem: 'Deu certo', dados: {}}
      */
      state.success = action.payload.ok;
      state.mensagem = action.payload.mensagem;
      userAdapter.addOne(state, action.payload.dados);
    });
    builder.addCase(atualizarRecadosAPI.fulfilled, (state, action) => {
      /*
       payload => { ok: true, mensagem: 'Deu certo', dados: {}}
      */

      state.success = action.payload.ok;
      state.mensagem = action.payload.mensagem;
      userAdapter.updateOne(state, { id: action.payload.dados.email, changes: action.payload.dados })
    });
  },
});

export default userSlice.reducer;
