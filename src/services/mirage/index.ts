import { createServer, Factory, Model } from "miragejs";
import faker from "faker";
import { fake } from "faker/locale/zh_TW";

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer(){
  const server = createServer({
    models:{
      user : Model.extend<Partial<User>>({})
    },
    factories:{
      user: Factory.extend({
        name(i : number) {
            return faker.name.findName()
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        created_at() {
          return faker.date.recent(10)
        }
      })
    },
    seeds(server){
        return server.createList('user', 10)
    },
    routes(){

      this.namespace = "api";
      this.timing = 750;

        this.get("/users");
        this.post("/users")

      this.namespace = "";
      this.passthrough()

    }
  });

  return server;
}