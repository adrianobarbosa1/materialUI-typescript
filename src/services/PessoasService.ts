import { Environment } from "../environment/environment";
import { Api } from "./api";

interface IListagemPessoa {
    id: number
    email: string
    cidadeId: number
    nomeCompleto: string
}

interface IDetalhePessoa {
    id: number
    email: string
    cidadeId: number
    nomeCompleto: string
}

type TPessoasComTotalCount = {
    data: IListagemPessoa[]
    totalCount: number
}

const getAll = async (page = 1, filter = ""): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_LINHA}&nomrCompleto_like=${filter}`;
    const {data, headers} = await Api.get(urlRelativa);
    if(data){
      return {
        data,
        totalCount: Number(headers["x-total-count"] || Environment.LIMITE_LINHA),
      };
    }

    return new Error("Error ao listar os registros.");
  } catch(error) {
    console.error(error);
    return new Error((error as {message: string}).message || "Error ao listar os registros.");
  }
};

const getById = async (): Promise<any> => {};
const create = async (): Promise<any> => {};
const updateById = async (): Promise<any> => {};
const deleteById = async (): Promise<any> => {};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};