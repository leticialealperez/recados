import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { ApiRequest } from '../../../services/api';
import { Recado } from '../users';

interface UpdateRecado {
  email: string;
  recado: Recado
}

interface CreateRecado {
  email: string;
  recado: Omit<Recado, 'id'>
}

interface DeleteRecado {
  email: string,
  id: string,
}

const adapter = createEntityAdapter<Recado>({
  selectId: (item) => item.id,
});

export const { selectAll: buscarTodosRecados, selectById: buscarRecadoPorId } = adapter.getSelectors(
  (state: RootState) => state.recados
);

export const atualizarRecadoUsuarioAPI = createAsyncThunk(
  'recado/atualizarRecadoUsuario',
  async (dados: UpdateRecado) => {
    const respostaApi = await ApiRequest.put(
      `/users/${dados.email}/recados/${dados.recado.id}`,
      JSON.stringify(dados.recado)
    );

    const dataParsed = JSON.parse(respostaApi.data);

    return dataParsed;
  }
);

export const adicionarRecadoAPI = createAsyncThunk(
  'recado/adicionarNovo',
  async (dados: CreateRecado) => {
    const respostaApi = await ApiRequest.post(
      `/users/${dados.email}/recados`,
      JSON.stringify(dados.recado)
    );

    const dataParsed = JSON.parse(respostaApi.data);

    return dataParsed;
  }
);

export const deletarRecadoAPI = createAsyncThunk('recado/deletarRecado', async(dados: DeleteRecado) => {
  const respostaApi = await ApiRequest.delete(`/users/${dados.email}/recados/${dados.id}`);

  const dataParsed = JSON.parse(respostaApi.data);

  return dataParsed;
})

const recadosSlice = createSlice({
  name: 'recados',
  initialState: adapter.getInitialState({
    success: false,
    mensagem: '',
  }),
  reducers: {
    deletarTodos: adapter.removeAll,
    adicionarTodosRecados: adapter.setAll,
  },
  extraReducers(builder) {
    builder.addCase(atualizarRecadoUsuarioAPI.fulfilled, (state, action) => {
      state.success = action.payload.ok
      state.mensagem = action.payload.mensagem
      adapter.updateOne(state, { id: action.payload.dados.id, changes: action.payload.dados })
    });

    builder.addCase(adicionarRecadoAPI.fulfilled, (state, action) => {
      state.success = action.payload.ok;
      state.mensagem = action.payload.mensagem;
      adapter.addOne(state, action.payload.dados)
    });

    builder.addCase(deletarRecadoAPI.fulfilled, (state, action) => {
      state.success = action.payload.ok;
      state.mensagem = action.payload.mensagem;
      adapter.setAll(state, action.payload.dados)
    })
  },
});

export const {
  deletarTodos,
  adicionarTodosRecados,
} = recadosSlice.actions;
export default recadosSlice.reducer;
