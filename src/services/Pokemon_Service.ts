import { PrismaClient } from "@prisma/client";
import { PokemonsType, UserType } from "../_types";

const prisma = new PrismaClient();
/* const TaskNotFoundError = require("../erros/TaskNotFoundError");
const NoPermission = require("../erros/TaskNotFoundError"); */

class TasksServicesService {
  async getPokemons(userId: number) {
    const tasksFind = await prisma.pokemos.findMany({
      where: {
        userId,
      },
    });
    return tasksFind;
  }

  async getPokemonById(userId: number, pokeId: number) {
    console.log("userID ", userId, "pokeId", pokeId);
    const taskSelected = await prisma.pokemos.findFirst({
      where: {
        pokeId: pokeId,
      },
    });
    if (!taskSelected) {
      console.log("Tarefa não encontrada");
      //throw new TaskNotFoundError("Tarefa não encontrada");
    }

    if (taskSelected?.userId != userId) {
      console.log("Essa tarefa nao é sua");
      // throw new NoPermission("Essa tarefa nao é sua");
    }
    return taskSelected;
  }

  async addPokemon(userId: number, data: PokemonsType) {
    const add = await prisma.pokemos.create({
      data: {
        userId,
        name: data.name,
        ability: data.ability,
      },
    });
    return add;
  }
  async deletePokemon(userId: number, id: number) {
    const avaibleTask = await this.getPokemonById(userId, id);
    await prisma.pokemos.delete({
      where: {
        pokeId: avaibleTask?.pokeId,
      },
    });
    return "Tarefa deletada com Sucesso";
  }
  async updatePokemon(userId: number, pokeId: number, data: PokemonsType) {
    const avaibleTask = await this.getPokemonById(userId, pokeId);
    console.log("aqui e o data", avaibleTask);
    const update = prisma.pokemos.update({
      where: {
        pokeId: avaibleTask?.pokeId,
      },
      data: {
        name: data.name,
        ability: data.ability,
      },
    });
    return update;
  }
}
export default new TasksServicesService();
