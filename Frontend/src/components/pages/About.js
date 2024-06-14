import React from "react";
import AboutUs from "../../components/images/h2.png";
import sawi from "../../components/images/s.png"
import juhi from "../../components/images/juhi-modified.png"
import Team from "./Team";
// import 'boxicons'
const About = () => {
  return (





    <div className="font-poppins">
      <h1 className="text-3xl font-bold p-4 ml-2 ">About Us</h1>

      <div className="container mx-auto text-center  w-[45%] ">
        <p className="text-3xl mb-4  mx-auto ">Journey of Learnskillz......</p>

      </div>
      <img src={AboutUs} alt="About Us" className=" w-1/3 mx-auto" />
      <h2 className=" text-xl m-2 ml-4 text-slate-100">our story</h2>
      <div>
        <h2 className="text-2xl ml-4 w-1/3 font-bold ">
          We Understands the importance of right guidance and right path and we
          are here to help you.
        </h2>
        <div className="font-poppins mx-4">
          <div className="mt-2">
            <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-blue-200 mr-4">
              <h2 className="text-2xl font-bold ">Our Mission</h2>
              <p className="text-gray-700">
                At LearnSkillz, our mission is to empower college students with
                the skills and resources they need to succeed in their placement
                exams and kickstart their careers. Whether you're aiming for
                top-tier companies or seeking to ace your aptitude tests, we're
                here to support you every step of the way.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-blue-200 mr-4">
              <h2 className="text-2xl font-bold ">Our Vision</h2>
              <p className="text-gray-700">
                We envision a future where every college student has access to
                high-quality resources and guidance to excel in their placement
                journey. By providing comprehensive study materials, practice
                tests, and career guidance, we aim to level the playing field
                and help students unlock their full potential.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="font-poppins mx-4">
        <div className=" mt-2 flex flex-wrap">
          <div className="flex-1 mr-4 mb-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-blue-200">
              <h2 className="text-2xl font-bold ">What we Offer</h2>
              <ul className="list-disc list-inside mt-2">
                <li>
                  Comprehensive Study Materials: We offer a wide range of study
                  materials covering aptitude, reasoning, verbal, and other
                  relevant topics tailored to placement exams.
                </li>
                <li>
                  Practice Tests: Put your skills to the test with our interactive
                  practice tests designed to simulate real exam conditions and
                  track your progress over time.
                </li>
                <li>
                  Community Support: Join a vibrant community of fellow
                  students and professionals to share tips, advice, and
                  support each other on your placement journey.
                </li>
                <li>Company Insights: Explore insights
                  into top companies' hiring criteria, interview processes, and
                  frequently asked questions to better prepare for your dream job</li>
                <li>Expert Guidance: Get expert
                  advice and tips from industry professionals and experienced
                  mentors to help you navigate the recruitment process and stand
                  out to potential employers. .</li>
              </ul>
            </div>
          </div>
          <div className="mb-4">

            <div className="mb-6 border  rounded-lg p-4 bg-blue-200">
              <h2 className="text-2xl font-bold mb-2">Why Choose Us</h2>
              <ul className="list-disc list-inside mt-2">
                <li>
                  User-Friendly Interface: Our website features a
                  user-friendly interface designed for easy navigation and
                  seamless user experience.
                </li>
                <li>
                  Up-to-Date Content: We constantly update our content to
                  reflect the latest trends and changes in placement exams and
                  recruitment practices.
                </li>
                <li>
                  Community Support: Join a vibrant community of fellow
                  students and professionals to share tips, advice, and
                  support each other on your placement journey.
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <h2 className="text-3xl  mb-4 w-2/3 mx-auto text-center ">
        Meet Our Team
      </h2>
      <div className="flex flex-row items-center">
        <Team name="Juhi Kalsi" mail="mail" linkedin="linkedin" image={juhi} />
        <Team name="sawi choukikar" mail="mail" linkedin="linkedin" image={sawi} />
      </div>
    </div>
  );
};

export default About;
