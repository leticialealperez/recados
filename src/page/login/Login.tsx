import React, {useState, useEffect} from "react";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Botao } from "../../components/botao/Botao";
import Input from "../../components/Input/Inputs";
import { Imagemlado } from "../../components/imgLado/ImagemLado";
import { useNavigate } from 'react-router-dom';
import { InputName } from '../cadastro/Cadastrar';
import { buscarUsuariosAPI, selectUsers } from '../../store/modules/users';
import { useAppDispatch, useAppSelector } from '../../store/types.hooks';
import { createUserLogged } from '../../store/modules/users/userLogged';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.growdev.com.br/">
        Growdev
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Logar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const usersRedux = useAppSelector(selectUsers);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(buscarUsuariosAPI())
  }, [dispatch])

  useEffect(() => {
    const userLogged = localStorage.getItem('userLogged')

    if(userLogged) {
      dispatch(createUserLogged(userLogged))

      navigate('/home')
    }
  }, [dispatch, navigate])

  const changeInput = (key: InputName, value: string) => {
    
    switch(key) {
      case 'email':
        setEmail(value);
      break;

      case 'password':
        setPassword(value);
      break;

      default:
    }
  }

  const handleClick = () => {
    if(!verifyInputs()) {
      return
    }

    dispatch(createUserLogged(email))
    clearInput();
    setTimeout(() => {
        navigate('/home')
    }, 1000);
  }

  const clearInput = () => {
    setEmail('');
    setPassword('');
  }

  const verifyInputs = (): boolean => {
    if(!email || !password) {
      alert('Existem campos sem preenchimento. Verifique!');
      return false
    }

    // addOne = email já existir substitui, se não existir adiciona
    const userFound = usersRedux.find((user) => user.email === email && user.password === password);

    if(!userFound) {
      alert('Usuario não encontrado! Verifique!');
      return false;
    }

    return true;
  }

  return (
    <Grid container>
      <Imagemlado />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
      >
        <Box
          sx={{
            my: 26,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 7, fontSize:30, fontStyle:"italic", fontWeight:"900" }}>
            LOGAR NO SISTEMA
          </Typography>

          <Box component="form" sx={{ mt: 2 }}>
            
            <Grid item xs={12} width='30vw'>
              <Input label="E-mail" type="email" name='email' onChange={changeInput} value={email}/>
            </Grid>

            <Grid item xs={12} width='30vw'>
              <Input label="Senha" type="password" name='password' onChange={changeInput} value={password}/>
            </Grid>

            <Botao tipoBotao="button" onClick={handleClick}>
              Logar
            </Botao>

            <Grid container>
              <Grid item>
                <Link variant="body2" onClick={() => navigate('/cadastrar')}>
                  Não tem uma conta? Inscrever-se
                </Link>
              </Grid>
            </Grid>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
