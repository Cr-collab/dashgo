import { useQuery } from "react-query"
import { api } from "../api"

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

type GetUserResponse = {
  users: User[];
  totalCount: number;
}

export async function getUsers(page : number) : Promise<GetUserResponse> {
  const {data , headers } = await api.get('http://localhost:3000/api/users', {
    params: {
      page,
    }
  })
     

  const totalCount = Number(headers["x-total-count"])

     const users = data.users.map(user => {
         return {
             name: user.name, 
            id: user.id,
            email: user.email,
            created_at: new Intl.DateTimeFormat('pt-BR',{ day: '2-digit' , month:'long' , year:'numeric'}).format(new Date(user.created_at))
         }
     })

    return{
      users, 
      totalCount,
    }

}

export function useUsers(page: number){
 return useQuery(['users', page],() => getUsers(page) ,{
    staleTime: 1000 * 10
  })

}