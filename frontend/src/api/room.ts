import { ISession } from "common";
import { fetchData } from "./common";

export const fetchSessions = async (): Promise<ISession[] | null> => {
  const url = '/api/rooms';
  return fetchData<ISession[]>(url);
};

export const fetchChatMessages = async (): Promise<ISession[] | null> => {
  const url = '/api/rooms';
  return fetchData<ISession[]>(url);
};