import React from 'react';

import Hero from '../components/Hero';
import ServiceFeatures from '../components/ServiceFeatures';
import BestSelling from '../components/BestSelling';
import NewArrival from "../components/NewArrival";
import Shirtsection from "../components/Shirtsection"
import Panjabi from "../components/Panjabi"
import Pant from "../components/Pant"
import Category from '../components/category';

function Home() {
  return (
    <div>
      <Hero />
      <ServiceFeatures />
      <Category />
      <BestSelling />
      <NewArrival />
      <Shirtsection />
      <Panjabi />
      <Pant />
    </div>
  );
}

export default Home;
