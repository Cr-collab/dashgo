import { Box, Text, Stack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

//propriedades que o componente vai receber 
interface  PaginationProps {
  totalCountOfRegisters : number;
  // numero total de registros 
  registersPerPage?: number;
  // rgistros por pagina 
  currentPage?: number;
  //qual que é pagina atual  
  onPageChange1: (page: number) => void;
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
  registersPerPage = 10,
  currentPage,
  onPageChange1
}: PaginationProps){

  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);
  // qual é ultima pagina possivel

  console.log(lastPage)

  const previousPage = currentPage > 1 ?  // se a pagina atual for maior que um ai eu façõ o paginas irmãs

   generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
  : []


  console.log(previousPage.length, 'previousPage')


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

           {
             currentPage > ( 1 + siblingsCount) && (
               <>
               
                <PaginationItem number={1} onPageChange={onPageChange1} />
                {currentPage > (2+siblingsCount) && (  
                    <Text 
                    color="gray.300" 
                    width="8"
                    textAlign="center"
                    >...  </Text> 
                  ) }
               </>
             )
           }

            {
            previousPage.length > 0 && previousPage.map(page =>{
           return  (<PaginationItem onPageChange={onPageChange1}   number={page} key={page} />)

            }) }

            <PaginationItem onPageChange={onPageChange1}  number={currentPage} isCurrent/>
           
            {nextPages.length > 0 && nextPages.map(page =>{
           return(  <PaginationItem onPageChange={onPageChange1}  number={page} key={page} />)

            }) }

            
           {
              ( currentPage + siblingsCount) < lastPage && (
                <>
                  {(currentPage + 1 + siblingsCount ) < lastPage && (  
                    <Text 
                    color="gray.300" 
                    width="8"
                    textAlign="center"
                    >...  </Text> 
                  )}
                  <PaginationItem onPageChange={onPageChange1}  number={lastPage} />
                </>
             )
           }
          </Stack>
       </Stack>
    )
}