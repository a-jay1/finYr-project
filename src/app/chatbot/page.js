"use client";
// import Chatbot from "@/components/bridge/chatbot";

// export default function Page() {

//     return (
//      <>
//         <Chatbot />
//      </>
//     );

// }

import { useEffect, useState } from "react";
import { insertToDB } from "../actions/operations";
import Chatbot from "@/components/bridge/chatbot";

export default function Movies() {
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   console.log("DEBUG");
  //   insertToDB({
  //     name: "SUNJAY",
  //     age: 20,
  //     gender: "Male",
  //     location: "Hyderabad",
  //     description: "The movie that will be inserted into the database.",
  //   });
  //   console.log("INITT");
  // }, []);

  // useEffect(() => {
  //   async function fetchMovies() {
  //     const res = await fetch("../api/routs");
  //     const data = await res.json();
  //     setMovies(data);
  //   }

  //   fetchMovies();
  // }, []);

  return (
    <Chatbot />
  );
}
