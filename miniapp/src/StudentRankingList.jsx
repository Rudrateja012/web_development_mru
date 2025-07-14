import React from 'react';

const students = [
  { name: 'Rajeev', rank: 1, marks: 95 },
  { name: 'Rahul', rank: 2, marks: 91 },
  { name: 'Simran', rank: 3, marks: 85 },
  { name: 'John', rank: 4, marks: 72 },
  { name: 'Anjali', rank: 5, marks: -55 },
];

const StudentRankingList = () => (
  <div>
    <h1>Student Rankings</h1>
    <ul>
      {students.map(student => (
        <li key={student.name}>
          {student.name} - Rank: {student.rank} - Marks: {student.marks}{" "}
          {
           student.marks >= 90 && student.marks <= 100
            ? <span style={{ color: 'gold' }}>Topper</span>
            : student.marks >= 60 && student.marks < 90
              ? <span style={{ color: 'green' }}>•Average</span>
            : student.marks < 60 && student.marks >= 0
              ? <span style={{ color: 'red' }}>Needs Improvement</span>
              : <span style={{ color: 'teal' }}>no negative marks</span>
          }
        </li>
      ))}
    </ul>
  </div>
);

export default StudentRankingList;