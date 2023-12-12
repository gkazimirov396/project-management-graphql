import { useMutation } from '@apollo/client';
import { Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

import { GET_CLIENTS } from '../../services/queries/client';
import { GET_PROJECTS } from '../../services/queries/project';
import { DELETE_CLIENT } from '../../services/mutations/client';

function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-error btn-outline" onClick={deleteClient}>
          <Trash2 />
        </button>
      </td>
    </tr>
  );
}

ClientRow.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};

export default ClientRow;
