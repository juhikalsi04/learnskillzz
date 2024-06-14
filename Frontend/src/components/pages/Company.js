import React from "react";
import { useParams } from "react-router-dom";
import companyInfo from "./companyInfo.json"; // Adjust the path as necessary

const Company = () => {
  const { companyName } = useParams(); // Get the company name from the URL params
  const company = companyInfo.find(comp => comp.name.toLowerCase() === companyName.toLowerCase());

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <div className="font-poppins mx-4">
      <h1 className="text-3xl font-bold mt-6">{company.name}</h1>
      <hr className="border-t border-gray-200 my-4"></hr>
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">About the Company</h2>
          <p className="text-gray-700">{company.description}</p>
        </div>

        {/* Hiring Flow Card */}
        <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-blue-200">
          <h2 className="text-2xl font-bold mb-2">Hiring Flow</h2>
          <ul className="list-disc list-inside text-gray-700">
            {company.hiringFlow.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

        {/* Eligibility Criteria Card */}
        <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-blue-200">
          <h2 className="text-2xl font-bold mb-2">Eligibility Criteria</h2>
          <ul className="list-disc list-inside text-gray-700">
            {company.eligibilityCriteria.map((criteria, index) => (
              <li key={index}>{criteria}</li>
            ))}
          </ul>
        </div>

        {/* Syllabus Cards */}
        <div className="flex justify-between mb-6">
          {/* Syllabus Card 1 */}
          <div className="w-full md:w-1/3 border border-gray-200 rounded-lg p-4 bg-blue-200 mx-1">
            <h2 className="text-2xl font-bold mb-2">Aptitude Syllabus</h2>
            <ul className="list-disc list-inside text-gray-700">
              {company.aptitudeSyllabus.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>

          {/* Syllabus Card 2 */}
          <div className="w-full md:w-1/3 border border-gray-200 rounded-lg p-4 bg-blue-200 mx-1">
            <h2 className="text-2xl font-bold mb-2">Reasoning Syllabus</h2>
            <ul className="list-disc list-inside text-gray-700">
              {company.reasoningSyllabus.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>

          {/* Syllabus Card 3 */}
          <div className="w-full md:w-1/3 border border-gray-200 rounded-lg p-4 bg-blue-200 mx-1">
            <h2 className="text-2xl font-bold mb-2">Verbal Syllabus</h2>
            <ul className="list-disc list-inside text-gray-700">
              {company.verbalSyllabus.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2"> For More Information</h2>
          
          <a href={company.website} target="blank" className="text-blue-500 hover:underline">
            Visit Company Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Company;
