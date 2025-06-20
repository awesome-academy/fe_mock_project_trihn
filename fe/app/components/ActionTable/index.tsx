import { Edit, Trash2 } from 'lucide-react';
import { FC } from 'react';

type ActionTableProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

const ActionTable: FC<ActionTableProps> = ({ onEdit, onDelete }) => (
  <div className="flex gap-1 justify-center">
    {onEdit && (
      <button
        className="btn btn-xs btn-ghost"
        onClick={onEdit}
        aria-label="Edit"
      >
        <Edit className="w-4 h-4 text-green-500 hover:text-green-600 transition" />
      </button>
    )}
    {onDelete && (
      <button
        className="btn btn-xs btn-ghost"
        onClick={onDelete}
        aria-label="Delete"
      >
        <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600 transition" />
      </button>
    )}
  </div>
);

export default ActionTable;
