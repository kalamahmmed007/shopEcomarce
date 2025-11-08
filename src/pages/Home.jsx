import React from "react";
import Hero from "../components/Hero";
import ServiceFeatures from "../components/ServiceFeatures";
import Category from "../components/Category";
import BestSellingProducts from "../components/BestSellingProducts"; // make sure filename matches
import NewArrival from "../components/NewArrival";
import Shirtsection from "../components/Shirtsection";
import Panjabi from "../components/Panjabi";
import Pant from "../components/Pant";

function Home() {
  return (
    <div>
      <Hero />
      <ServiceFeatures />
      <Category />
      <BestSellingProducts />
      <NewArrival />
      <Shirtsection />
      <Panjabi />
      <Pant />
    </div>
  );
}

export default Home;
