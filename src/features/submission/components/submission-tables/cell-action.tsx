'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Assignments } from '@/types/school-index';
import { IconDotsVertical } from '@tabler/icons-react';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SubmissionCellActionProps {
  data: Assignments;
  submittedAssignments: (number | string)[];
}

export const SubmissionCellAction: React.FC<SubmissionCellActionProps> = ({
  data,
  submittedAssignments
}) => {
  const router = useRouter();

  const handleSubmitClick = () => {
    // 👉 Navigate to submission form page with assignment_id in query string
    router.push(`/dashboard/submission/new?assignment_id=${data.id}`);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <DropdownMenuItem
          disabled={submittedAssignments.includes(data.id)}
          onClick={handleSubmitClick}
        >
          <Send className="mr-2 h-4 w-4" /> Submit
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={submittedAssignments.includes(data.id)}
          onClick={() => router.push(`/dashboard/submissions/${data.id}`)}
        >
          <Send className="mr-2 h-4 w-4" /> Status
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
