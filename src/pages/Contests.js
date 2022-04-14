import React from "react";
import { MultiToggler } from "../components/MultiToggler";

const handleClick = (s) => {
  console.log(s)
};


export function Contests() {
  return (
    <>
      <MultiToggler initialState="a" states={["a", "b", "c"]} onClick={e=>handleClick(e)}/>
      <MultiToggler initialState="2" states={["1", "2", "3"]} onClick={e=>handleClick(e)}/>

    </>
  );
}
