import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
import Chatbot from "../components/Chatbot";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to X Health Desk – Your Smart Hospital Companion"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
      <Chatbot/>
    </>
  );
};

export default Home;