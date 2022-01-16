import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";




export default function UserList(){

  const { data, isLoading, isFetching , error} = useQuery('users',async ()=>{

    const {data} = await api.get('http://localhost:3000/api/users')
     

     const users = data.users.map(user => {
         return {
             name: user.name,
            id: user.id,
            email: user.email,
            created_at: new Intl.DateTimeFormat('pt-BR',{ day: '2-digit' , month:'long' , year:'numeric'}).format(new Date(user.created_at))
         }
     })

    return users
  },{
    staleTime: 1000 * 10
  })


  const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
  })


 
  

  return (
    <Box>
        <Header/>
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">

          <Sidebar/> 

          <Box flex="1" borderRadius={8} bgColor="gray.800" p="8">
             <Flex mb="8" justify="space-between" align="center">
                <Heading size="lg" fontWeight="normal">
                   Usuarios   
                   { 
                      !isLoading && isFetching && <Spinner size="sm"  color="gray.500" ml="4"/>
                   }
                </Heading>
                <Link href="/users/create">
                
                    <Button as="a" size="sm" fontSize="sm"  colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize={20} />} > 
                    Criar novo 
                    </Button>
                </Link>
             </Flex>

               {
                 isLoading ? (
                   <Flex justify="center" >
                    <Spinner/>
                   </Flex>
                 ) : error ? (
                      < Flex justify="center">
                        <Text>
                          Falha ao Obter dados dos usuários.
                        </Text>
                      </Flex>  
                 ) :(
                   <>
                  <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr >
                      <Th px={["4","4","6"]} color="gray.300" w="8">
                         <Checkbox colorScheme="pink"/>
                       </Th>
  
                       <Th>
                           Usuario
                       </Th>
  
                       { isWideVersion && (
                          <Th>
                          Data de Cadastro
                          </Th>
                       ) }
  
                       <Th>
  
                       </Th>
  
                    </Tr>
                  </Thead>
  
                  <Tbody>
                       {
                         data.map((user)=>{
                           return (
                            <Tr key={user.id}>
                            <Td px={["4","4","6"]}> 
                            <Checkbox colorScheme="pink"/>
                            </Td>
       
                            <Td>
                              <Box>
                                  <Text fontWeight="bold"> {user.name} </Text>   
                                  <Text fontSize="sm" color="gray.300"> {user.email} </Text>   
                              </Box>
                            </Td>
                            { isWideVersion && <Td> {  user.created_at  } </Td> }
                           
                         </Tr>
                           )
                         })
                       }
                  </Tbody>
               </Table>
               <Pagination/>
               </>
                 )
               }
          </Box>
        </Flex>
    </Box>
  )
}