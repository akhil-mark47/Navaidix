import React from 'react';
import CandidateForm from '../../components/forms/CandidateForm';

const AddCandidate = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Candidate</h1>
      <CandidateForm editMode={false} />
    </div>
  );
};

export default AddCandidate;