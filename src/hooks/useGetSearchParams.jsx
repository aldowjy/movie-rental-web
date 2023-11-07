import { useLocation } from "react-router-dom";
import { parseUrlQuery } from "../utils";

export default function useGetSearchParams() {
  const { search } = useLocation();
  return parseUrlQuery(search.replace?.("?", ""));
}
