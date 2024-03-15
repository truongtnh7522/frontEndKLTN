import React, { useEffect, useState } from "react";
import CardPost from "./CardPost/CardPost";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface Props {
  data: any;
  isLoading: any;
}

const CardPosts = ({ data, isLoading }: Props) => {
  console.log(data);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (data.success == true) {
      setLoad(true);
    }
  }, [isLoading]);
  return (
    <div className="w-[70%] py-6  ">
      <>
        {load === false ? (
          <div>
            <Skeleton className=" h-[600px] w-[550px] mr-[30%] ml-[0%]" />
          </div>
        ) : (
          <>
            {" "}
            {data?.data?.map((index, item) => (
              <CardPost data={index} />
            ))}{" "}
          </>
        )}
      </>
    </div>
  );
};

export default CardPosts;
