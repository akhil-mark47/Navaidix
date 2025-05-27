import React from 'react';
import CandidateForm from '../../components/forms/CandidateForm';

const EditCandidate = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Candidate</h1>
      <CandidateForm editMode={true} />
    </div>
  );
};

export default EditCandidate;