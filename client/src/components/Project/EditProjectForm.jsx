import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { GET_PROJECT } from '../../services/queries/project';
import { UPDATE_PROJECT } from '../../services/mutations/project';

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
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: project.name,
      description: project.description,
      status: formatProjectStatus(project.status),
    },
  });
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

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
      console.error(error);
      for (const err of error.graphQLErrors) {
        const path = err.message.split('"')[1];
        setError(path, {
          message: err.message.replace(`"${path}"`, 'This field'),
        });
      }
    }
  };

  return (
    <div className="mt-5">
      <h3>Update Project</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onInput={() => setIsDisabled(false)}
      >
        <div className="mb-3">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="w-full max-w-xs form-control input input-bordered input-sm"
            id="name"
            {...register('name', {
              required: 'This field is required!',
            })}
          />
          {errors.name && (
            <div className="text-error">{errors.name.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full max-w-xs form-control textarea textarea-bordered"
            id="description"
            rows={5}
            {...register('description', {
              required: 'This field is required!',
              minLength: {
                value: 3,
                message: 'This field should be at least 3 characters long!',
              },
              maxLength: {
                value: 100,
                message:
                  'This field should not be more than 100 characters long!',
              },
            })}
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
            {...register('status', {
              validate: val =>
                ['new', 'progress', 'completed'].includes(val) ||
                'This field only accepts "new", "progress", "completed" as values!',
            })}
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
          disabled={isDisabled}
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
