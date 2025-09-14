interface SubmissionStatusProps {
  assignmentId: number | string;
  submittedAssignments: (number | string)[];
}

export const SubmissionStatus: React.FC<SubmissionStatusProps> = ({
  assignmentId,
  submittedAssignments
}) => {
  const isSubmitted = submittedAssignments.includes(assignmentId);

  return (
    <div>
      {isSubmitted ? (
        <span className='font-medium text-green-600'>Submitted</span>
      ) : (
        <span className='font-medium text-red-600'>Pending</span>
      )}
    </div>
  );
};
