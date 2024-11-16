import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { GET_PROJECT } from '../../services/queries/project';
import { UPDATE_PROJECT } from '../../services/mutations/project';

import { AddProjectSchema } from '../../schema/addProject';

const formatProjectStatus = status => {
  switch (status) {
    case 'Not Started':
      return 'new';
    case 'In Progress':
      return 'progress';
    case 'Completed':
      return 'completed';
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

function EditProjectForm({ project }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(AddProjectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      status: formatProjectStatus(project.status),
    },
  });
  const navigate = useNavigate();

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    onCompleted: () => navigate('/projects'),
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = async formData => {
    try {
      const result = await updateProject({
        variables: {
          updatedProject: {
            id: project.id,
            ...formData,
          },
        },
      });

      console.log(result);
    } catch (error) {
      for (const { path, message } of error.graphQLErrors) {
        setError(path, {
          message,
        });
      }
    }
  };

  return (
    <div className="mt-5">
      <h3>Update Project</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="label" htmlFor="name">
            Name
          </label>

          <input
            type="text"
            className="w-full max-w-xs form-control input input-bordered input-sm"
            id="name"
            {...register('name')}
          />

          {errors.name && <div className="text-error">{errors.name.message}</div>}
        </div>

        <div className="mb-3">
          <label className="label" htmlFor="description">
            Description
          </label>

          <textarea
            className="w-full max-w-xs form-control textarea textarea-bordered"
            id="description"
            rows={5}
            {...register('description')}
          ></textarea>

          {errors.description && (
            <div className="text-error">{errors.description.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="label" htmlFor="status">
            Status
          </label>

          <select
            id="status"
            defaultValue="new"
            className="w-full max-w-xs form-control select select-bordered select-sm"
            {...register('status')}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {errors.status && (
            <div className="text-error">{errors.status.message}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={!isDirty}
          className="text-white btn btn-primary hover:opacity-90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

EditProjectForm.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['Not Started', 'In Progress', 'Completed'])
      .isRequired,
  }).isRequired,
};

export default EditProjectForm;
