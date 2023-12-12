import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

import { DELETE_PROJECT } from '../../services/mutations/project';
import { GET_PROJECTS } from '../../services/queries/project';

function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/projects'),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="flex ms-auto">
      <button className="m-2 btn btn-error" onClick={deleteProject}>
        <Trash2 className="mr-1" /> Delete Project
      </button>
    </div>
  );
}

DeleteProjectButton.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default DeleteProjectButton;
