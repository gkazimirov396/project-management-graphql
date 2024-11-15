import { List, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_PROJECT } from '../../services/mutations/project';
import { GET_PROJECTS } from '../../services/queries/project';
import { GET_CLIENTS } from '../../services/queries/client';
import { useErrorBoundary } from '../../hooks/useErrorBoundary';

function AddProjectModal() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const { showBoundary } = useErrorBoundary();

  const [addProject] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS }) ?? {};
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = async formData => {
    try {
      const result = await addProject({ variables: { newProject: formData } });
      console.log(result);

      reset();
      document.getElementById('addProject').close();
    } catch (error) {
      for (const err of error.graphQLErrors) {
        const path = err.message.split('"')[1];
        setError(path, {
          message: err.message.replace(`"${path}"`, 'This field'),
        });
      }
    }
  };

  if (loading) return null;
  if (error) return showBoundary(error);

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="self-end text-white w-fit btn btn-primary hover:opacity-90"
            onClick={() => document.getElementById('addProject').showModal()}
          >
            <div className="flex items-center">
              <List className="mr-4" />
              <div>New Project</div>
            </div>
          </button>

          <dialog id="addProject" className="modal">
            <div className="modal-box">
              <h5 className="text-3xl">Add Project</h5>
              <form method="dialog" className="mb-6">
                <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                  <X />
                </button>
              </form>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                        message:
                          'This field should be at least 3 characters long!',
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
                        'The value you entered is not a valid client!',
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

                <div className="mb-3">
                  <label className="label" htmlFor="clientId">
                    Client
                  </label>
                  <select
                    id="clientId"
                    className="w-full max-w-xs form-control select select-bordered select-sm"
                    {...register('clientId', {
                      required: 'This field is required!',
                      validate: val =>
                        data.clients.map(client => client.id).includes(val) ||
                        'This field only accepts "new", "progress", "completed" as values!',
                    })}
                  >
                    <option value="">Select Client</option>
                    {data.clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                  {errors.clientId && (
                    <div className="text-error">{errors.clientId.message}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="text-white btn btn-primary hover:opacity-90"
                >
                  Submit
                </button>
              </form>
            </div>
          </dialog>
        </>
      )}
    </>
  );
}

export default AddProjectModal;
