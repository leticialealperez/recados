import { TableCell, TableRow } from "@mui/material"


export const HomeTabela: React.FC = () => {

    return (
        <>
        <TableRow>
                    <TableCell> 1 </TableCell>
                    <TableCell align="center">Ler Livro</TableCell>
                    <TableCell align="center">Rever o React-Redux-Toolkit</TableCell>
                      <button>Apagar</button>
                      <button style={{marginLeft:15}}>Editar</button>
                </TableRow>   
                <TableRow>
                    <TableCell> 2 </TableCell>
                    <TableCell align="center">Ler Livro</TableCell>
                    <TableCell align="center">Rever o React-Redux-Toolkit</TableCell>
                    <button>Apagar</button>
                    <button style={{marginLeft:15}}>Editar</button>
                </TableRow>  
                <TableRow>
                    <TableCell> 3 </TableCell>
                    <TableCell align="center">Ler Livro</TableCell>
                    <TableCell align="center">Rever o React-Redux-Toolkit</TableCell>
                    <button>Apagar</button>
                    <button style={{marginLeft:15}}>Editar</button>
                </TableRow>
        </>
    )
}