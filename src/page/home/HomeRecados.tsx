import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState, useEffect } from "react";
import { InputHome } from "../../components/inputHome/InputHome";
import TopBar from "../../components/top-bar/TopBar";
import TableBody from '@mui/material/TableBody';
import { useAppDispatch, useAppSelector } from '../../store/types.hooks';
import { adicionarTodosRecados, atualizarRecadoUsuarioAPI, buscarTodosRecados, deletarRecadoAPI } from '../../store/modules/recados';
import { selectUsersByEmail } from '../../store/modules/users';
import { useNavigate } from 'react-router-dom';

// isso vai ta no modal
/* 
interface ModalProps {
  idRecado: string;
  open: boolean; // true ou false
  setOpen: React.Dispatch<React.SetStateAction<string>>; // funcao que fecha o modal
} 
*/

export const HomeRecados: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const userLogged = useAppSelector((state) => state.userLogged);
  const userRedux = useAppSelector((state) => selectUsersByEmail(state, userLogged));
  const recadosRedux = useAppSelector(buscarTodosRecados);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(!userLogged) {
      navigate('/')
    }
  }, [navigate, userLogged])

  useEffect(() => {
    if(userRedux?.recados){

      dispatch(adicionarTodosRecados(userRedux.recados))

    }
  }, [userRedux?.recados, dispatch])

  const handleUpdate = (id: string) => {
    dispatch(atualizarRecadoUsuarioAPI({ 
      email: userLogged, 
      recado: { 
        id, 
        description: 'Modificado', 
        detail: 'Modificado'
      }
    }))
  }

  const handleDelete = (id: string) => {
    dispatch(deletarRecadoAPI({ email: userLogged, id}))
  }
  return (
    <>

      <TopBar />
      <Box 
      component={Paper}  
      elevation={5} 
      sx={{ 
        display: "flex", 
        flexDirection:'column',  
        width: '97vw', height:'85vh' , 
        marginLeft:'1.5%', 
        marginTop:'2%'
      }}
      >

      <InputHome />

      <TableContainer sx={{marginTop:'2%', width:'95vw', marginLeft:'1.1%'}} component={Paper} elevation={5}>
          <Table>
                <TableHead >
                  <TableRow sx={{bgcolor:'#a9a9a9'}}>
                    <TableCell sx={{color:'white', fontSize:25, fontWeight:900}}> # ID</TableCell>
                    <TableCell align="center" sx={{color:'white', fontSize:25, fontWeight:900}}>Descrição</TableCell>
                    <TableCell align="center" sx={{color:'white', fontSize:25, fontWeight:900}}>Detalhamento</TableCell>
                    <TableCell align="center" sx={{color:'white', fontSize:25, fontWeight:900}}>Ações</TableCell>
                  </TableRow>
                </TableHead>    
                <TableBody>
                  { recadosRedux.map((recado, index) => (
                    <TableRow
                      key={recado.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index+1}
                      </TableCell>
                      <TableCell align="right">{recado.description}</TableCell>
                      <TableCell align="right">{recado.detail}</TableCell>
                      <TableCell align="right">
                        <div>
                          <button onClick={() => handleUpdate(recado.id)}>Editar</button>
                        </div>
                        <div>
                          <button onClick={() => handleDelete(recado.id)}>Apagar</button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                
               
          </Table>
      </TableContainer>
      </Box>
    </>
  );
};
function uuidv4(): string {
  throw new Error("Function not implemented.");
}

