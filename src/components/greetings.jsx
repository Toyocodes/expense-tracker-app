import React from 'react';
import { FaSun, FaMoon, FaCloudSun } from 'react-icons/fa';

const getGreeting = (name) => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return {
      greeting: `Good morning, ${name}`,
      icon: <FaSun className="text-yellow-500" size={25}/>,
    };
  } else if (hour < 18) {
    return {
      greeting: `Good afternoon, ${name}`,
      icon: <FaCloudSun className="text-orange-500" size={25}/>,
    };
  } else {
    return {
      greeting: `Good evening, ${name}`,
      icon: <FaMoon className="text-blue-500" size={25}/>,
    };
  }
};

const Greeting = ({ name }) => {
  const { greeting, icon } = getGreeting(name);

  return (
    <div className="flex items-center space-x-2">
      {icon}
      <h1 className="text-xl md:text-2xl font-semibold leading-10">{greeting}</h1>
      
    </div>
  );
};

export default Greeting;
