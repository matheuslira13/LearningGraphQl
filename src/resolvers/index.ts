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
    createUser: (__, args, context) => {
      const newUser = { ...args.data, id: dataUsers.length + 1 };
      dataUsers.push(newUser);
      context.pub.publish(USER_LISTENING, {
        userListening: newUser,
      });
      return newUser;
    },
  },
  Subscription: {
    //nao e função e objeto
    userListening: {
      //aqui sim e função
      subscribe: (obj, args, context) => {
        return context.pub.asyncIterator([USER_LISTENING]);
      },
    },
  },
};
