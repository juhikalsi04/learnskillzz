import React from "react";
import Card from "./Card";


const Home = () => {
  const cardsData = [
    { id: 1, gifUrl: 'https://img.freepik.com/free-vector/hand-drawn-neuroeducation-illustration_23-2150945405.jpg?t=st=1713808706~exp=1713812306~hmac=ac505785962c42777d703e4d6a33d3badfe3166d6a06966cd45f85e63af5bb77&w=740', heading: 'Aptitude', linkTo: '/aptitude' },
    { id: 2, gifUrl: 'https://images.freeimages.com/image/previews/a1a/study-kit-flat-png-design-5690859.png', heading: 'Reasoning', linkTo: '/reasoning' },
    { id: 3, gifUrl: 'https://img.freepik.com/free-vector/hand-drawn-life-coaching-illustration_23-2150257296.jpg?t=st=1713808635~exp=1713812235~hmac=8999a03ddd917402bbdeab6385e036687901bd5e941e64290e5bd597bdb5e334&w=740', heading: 'Verbal', linkTo: '/verbal' },
    { id: 4, gifUrl: 'https://img.freepik.com/free-vector/virtual-graduation-ceremony-with-college-graduate_23-2148571733.jpg?t=st=1713808225~exp=1713811825~hmac=d20bf28058df9788144a251ecf7a9502005f5d17e02259c5902c3ed971665311&w=740', heading: 'Placements', linkTo: '../Placement' },
    { id: 5, gifUrl: 'https://img.freepik.com/free-vector/hand-drawn-college-entrance-exam-illustration_23-2150412290.jpg?t=st=1713808147~exp=1713811747~hmac=6d6d3c53e59aba818dcf8bc022f389f70fd45a813fa8969210c0e6f51d474353&w=740', heading: 'Online tests', linkTo: '../OnlineTest' },
  ];

  return (
    <div className="ml-4 font-poppins">
      <h2 className="text-3xl font-bold p-4">
        <b>Welcome to LearnSkillz! </b>
      </h2>
      <h3 className="text-xl mb-4 ml-4 mx-auto">
        Your one-stop destination for college placement preparation and aptitude practice.
      </h3>
      <div className="container m-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mx-4 ">
          {cardsData.map(card => (
            <div key={card.id} className="flex justify-evenly">
              <Card gifUrl={card.gifUrl} heading={card.heading} linkTo={card.linkTo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;



