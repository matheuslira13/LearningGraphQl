import { RESTDataSource } from "@apollo/datasource-rest";

class GithubFunctionService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.github.com";
  }

  async getUser(login: any) {
    try {
      return await this.get(`/users/${login}`);
    } catch (error: any) {
      if (error.extensions.response.status === 404) {
        console.log("Usuario nao encontrado :", login);
      }
      console.log(error);
    }
  }
}

export default new GithubFunctionService(); // Exportação padrão
