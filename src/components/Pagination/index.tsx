import { Box, Button, Stack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

//propriedades que o componente vai receber 
interface  PaginationProps {
  totalCountOfRegisters : number;
  // numero total de registros 
  registersPerPage?: number;
  // rgistros por pagina 
  currentPage?: number;
  //qual que é pagina atual  
  onPageChange?: (page: number) => void;
  // o que acontece qaundo a pagina mudar 

}

const siblingsCount = 1;
// quantidade de irmãos 

function generatePagesArray(from: number, to: number){
  return [... new Array(to - from)].map((_, index)=>{
     return from + index  + 1 
  }).filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage,
  currentPage,
  onPageChange
}: PaginationProps){

  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);
  // qual é ultima pagina possivel

  const previousPage = currentPage > 1  // se a pagina atual for maior que um ai eu façõ o paginas irmãs
  ?
   generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
  : []


  const nextPages = currentPage < lastPage ?   
  generatePagesArray(currentPage , Math.min(currentPage + siblingsCount , lastPage)) :
  []

  return (
       <Stack
       direction={["column", "row"]}
       mt="8"
       justify="space-between"
       align="center"
       spacing="6"
       >

         <Box>
           <strong> 0 </strong> - <strong> 10 </strong> de <strong>100</strong>
         </Box>
          <Stack
          direction="row"
          spacing="2"
          > 
            {previousPage.length > 0 && previousPage.map(page =>{
            <PaginationItem number={page} key={page} />

            }) }

            <PaginationItem number={currentPage} isCurrent/>
           
            {nextPages.length > 0 && nextPages.map(page =>{
            <PaginationItem number={page} key={page} />

            }) }
          </Stack>
       </Stack>
    )
}