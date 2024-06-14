import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OnlineTest = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/onlinetest/sampletest');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Ensure testNo is a number and sort the data
        const sortedData = data.map(test => ({
          ...test,
          testNo: Number(test.testNo) // Convert testNo to a number if it's not already
        })).sort((a, b) => a.testNo - b.testNo);

        setTests(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='onlinetest font-poppins'>
      <h1 className='text-3xl font-bold p-4 '>Online Tests</h1>
      <hr className="h-px bg-black border-0 mx-4"></hr>
      <h2 className='text-xl p-4 '>Sample test papers</h2>
      <br></br>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th scope="col" style={{ borderBottom: '1px solid #ddd', padding: '8px' }}></th>
            <th scope="col" style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Tests</th>
            <th scope="col" style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Difficulty</th>
            <th scope="col" style={{ borderBottom: '1px solid #ddd', padding: '8px' }}></th>
          </tr>
        </thead>
        <tbody>
          {tests.map((e, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
              <th scope="row" style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{e.testNo}</th>
              <td style={{ borderBottom: '1px solid #ddd', padding: '20px 8px' }}>Sample Test {e.testNo}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center', color: `${e.color}` }}>{e.difficulty}</td>
              <td style={{ padding: '8px', textAlign: 'end' }}>
                <Link className='start-test'
                  style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    margin: '8px 0',
                    border: '1px solid #007bff',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                  to={`/api/onlinetest/sampletest/${e.testNo}`}>
                  Start Test
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OnlineTest;
