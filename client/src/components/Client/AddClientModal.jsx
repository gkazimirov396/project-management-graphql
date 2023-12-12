import { User, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import { ADD_CLIENT } from '../../services/mutations/client';
import { GET_CLIENTS } from '../../services/queries/client';

function AddClientModal() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const [addClient] = useMutation(ADD_CLIENT, {
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = async formData => {
    try {
      const result = await addClient({
        variables: { newClient: formData },
      });
      console.log(result);

      reset();
      document.getElementById('addClient').close();
    } catch (error) {
      for (const err of error.graphQLErrors) {
        const path = err.message.split('"')[1];
        setError(path, {
          type: 'deps',

          message: err.message.replace(`"${path}"`, 'This field'),
        });
      }
    }
  };

  return (
    <>
      <button
        className="self-end text-white w-fit btn btn-secondary hover:opacity-90"
        onClick={() => document.getElementById('addClient').showModal()}
      >
        <div className="flex items-center">
          <User className="mr-4" />
          <div>Add Client</div>
        </div>
      </button>

      <dialog id="addClient" className="modal">
        <div className="modal-box">
          <h5 className="text-3xl">Add Client</h5>
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
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="w-full max-w-xs form-control input input-bordered input-sm"
                id="email"
                {...register('email', {
                  required: 'This field is required!',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: 'The value you entered is not a valid e-mail!',
                  },
                })}
              />
              {errors.email && (
                <div className="text-error">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="label" htmlFor="phone">
                Phone
              </label>
              <input
                type="tel"
                className="w-full max-w-xs form-control input input-bordered input-sm"
                id="phone"
                {...register('phone', {
                  required: 'This field is required!',
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g,
                    message:
                      'The value you entered is not a valid phone number!',
                  },
                })}
              />
              {errors.phone && (
                <div className="text-error">{errors.phone.message}</div>
              )}
            </div>

            <button
              type="submit"
              className="text-white btn btn-secondary hover:opacity-90"
            >
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default AddClientModal;
