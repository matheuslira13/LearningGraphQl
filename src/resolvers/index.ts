import { PubSub } from "graphql-subscriptions";

const pub = new PubSub();

interface User {
  id: Number;
  name: string;
  email: string;
}

let dataUsers: User[] = [];

const USER_LISTENING = "USER_LISTENING";

export default {
  Query: {
    users: () => dataUsers,
  },
  Mutation: {
    createUser: (__: any, args: any, context: any) => {
      const newUser = { ...args.data, id: dataUsers.length + 1 };
      dataUsers.push(newUser);
      console.log("teste", newUser);
      pub?.publish(USER_LISTENING, {
        userListening: newUser,
      });
      return newUser;
    },
  },
  Subscription: {
    //nao e função e objeto
    userListening: {
      //aqui sim e função
      subscribe: (_: any, __: any, context: any) => {
        return pub?.asyncIterator([USER_LISTENING]);
      },
    },
  },
};
