import axios from "axios";
import { useGlobalContext } from "lib/globalContext";
import { useQuery } from "react-query";
import { useParams } from 'react-router-dom';

export const Detail = () => {
  const { id } = useParams();
  const { base } = useGlobalContext();
  const { isLoading, data } = useQuery(["repo1"], () =>
    axios.get(`https://reqres.in/api/users/${id}`).then((res) => res.data)
  );
  if (isLoading) return "Loading...";

  return (
    <div className="flex flex-col justify-center items-center text-3xl font-bold h-[100vh]">
        {data.data.first_name}-{data.data.last_name}
        <p>{`${base}`}</p>
    </div>
  );
};
