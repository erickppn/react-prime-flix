import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(date: string) {
  return format(date, "dd'/'MM'/'yyyy'", {
    locale: ptBR,
  });
}