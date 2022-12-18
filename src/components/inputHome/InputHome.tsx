import React, {useState} from 'react';
import {
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../store/types.hooks';
import { v4 as uuidv4 } from 'uuid';
import { adicionarRecadoAPI } from '../../store/modules/recados';

export const InputHome: React.FC = () => {
  const [detail, setDetail] = useState('');
  const [description, setDescription] = useState('');
  const userLogged = useAppSelector((state) => state.userLogged)
  const dispatch = useAppDispatch();

  const handleSave = () => {
    if(!detail || !description ) {
      alert('Preencha os campos!');
      return
    }

    dispatch(adicionarRecadoAPI({
      email: userLogged,
      recado: {
        description,
        detail
      }
    }))
  }
  return (
    <>
      <Grid container spacing={10}>
        <Grid item xs={5}>
          <TextField
            value={detail}
            required
            label="Detalhamento"
            variant="standard"
            sx={{ mt: 5 }}
            fullWidth
            onChange={(ev) => setDetail(ev.target.value)}
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            value={description}
            required
            label="Descrição"
            variant="standard"
            sx={{ mt: 5, ml: 5 }}
            fullWidth
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </Grid>

        <Grid item xs={2} sx={{ mt: 7 }}>
          <Button variant="contained" onClick={handleSave}>Adicnionar</Button>
        </Grid>
      </Grid>
    </>
  );
};
