import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
const Home = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  console.log(currentUser);
  return <div>ss</div>;
};

export default Home;
