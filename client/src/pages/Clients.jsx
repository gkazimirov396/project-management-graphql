import { useQuery } from '@apollo/client';

import { useErrorBoundary } from '../hooks/useErrorBoundary';

import { GET_CLIENTS } from '../services/queries/client';

import ClientRow from '../components/Client/ClientRow';
import AddClientModal from '../components/Client/AddClientModal';

import LoadingSpinner from '../components/ui/LoadingSpinner';

function Clients() {
  const { showBoundary } = useErrorBoundary();
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <LoadingSpinner />;
  if (error) return showBoundary(error);

  return (
    <div className="flex flex-col gap-2">
      <AddClientModal />
      {data.clients.length > 0 ? (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map(client => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-2xl">No Clients Yet.</p>
      )}
    </div>
  );
}

export default Clients;
