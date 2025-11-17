import axios from "axios";
import { Receita } from "../types/receita";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/receitas`;

export async function getReceitas(): Promise<Receita[]> {
  const res = await axios.get<Receita[]>(BASE_URL);
  return res.data;
}

export async function getReceita(id: string): Promise<Receita> {
  const res = await axios.get<Receita>(`${BASE_URL}/${id}`);
  return res.data;
}

export async function createReceita(data: Omit<Receita, "id">): Promise<Receita> {
  const res = await axios.post<Receita>(BASE_URL, data);
  return res.data;
}

export async function updateReceita(id: string, data: Partial<Receita>): Promise<Receita> {
  const res = await axios.put<Receita>(`${BASE_URL}/${id}`, data);
  return res.data;
}

export async function deleteReceita(id: string): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`);
}
