import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup' 
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";


type CreateUserFormData = {
   name: string;
   email: string;
   password: string;
   password_confirmation: string;
 }
 
 const createUserFormSchema = yup.object().shape({
   name: yup.string().required("Nome obrigatorio"),
   email: yup.string().required("E-mail obrigatorio").email("E-mail inválido"),
   password: yup.string().required("Senha obrigatoria").min(6 , 'No minimo 6 caracteres'),
   password_confirmation: yup.string().oneOf([ null, yup.ref('password') ]).required("Senha de Confirmação obrigatoria")
 })

export default function UserCreate(){

   const router = useRouter()
   const createUser = useMutation( async (user: CreateUserFormData) =>{
        const response = await api.post('/users', { 
           user :{
              ...user,
              created_at : new Date(),
           }

         })
         return response.data
   }, {
      onSuccess: ()=>{
         queryClient.invalidateQueries('users')
      }
   })

   const { register , handleSubmit, formState } = useForm({
      resolver: yupResolver(createUserFormSchema)
    })
  
    const handleCreateUser : SubmitHandler<CreateUserFormData> = async (values) => {
      await createUser.mutateAsync(values)

      router.push("/users")
    }
  
  
    const {errors} = formState 
    
   return (
     <Box>
       <Header/>

       <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar/>

          <Box   as="form" flex="1" borderRadius={8} bg="gray.800" p={["6","8"]} onSubmit={handleSubmit(handleCreateUser)}>
             <Heading size="lg" fontWeight="normal"> Criar usuario</Heading>
             <Divider my="6" borderColor="gray.700"/>

             <VStack spacing="8"> 
                      <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                          <Input name="name" label="Nome completo" type="text" {...register("name")} error={errors.name} />
                          <Input name="email" type="email" label="E-mail" {...register("email")} error={errors.email} />
                      </SimpleGrid>

                      <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                          <Input name="password" type="password" label="Senha"  {...register("password")} error={errors.password}/>
                          <Input name="password_confirmation" type="password" label="Confirmação da senha" {...register("password_confirmation")} error={errors.password_confirmation} />
                      </SimpleGrid>
             </VStack> 

             <Flex mt='8' justify='flex-end'> 
                  <HStack spacing="4">
                       <Link href="/users">
                       <Button colorScheme="whiteAlpha" >
                          Cancelar
                       </Button>
                       </Link>
                       <Button 
                       type="submit"
                       colorScheme="pink"
                       isLoading={formState.isSubmitting}
                       >
                          Salvar
                       </Button>
                  </HStack>
             </Flex>
         </Box>
       </Flex>
     </Box>
   )
}