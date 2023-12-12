import { Mail, Phone, User } from 'lucide-react';
import PropTypes from 'prop-types';

function ClientInfo({ client }) {
  return (
    <div>
      <h5 className="my-5 text-lg">Client Information:</h5>
      <ul className="flex flex-col gap-5">
        <li>
          <User className="inline-block mr-1" />
          {client.name}
        </li>
        <li>
          <Mail className="inline-block mr-1" /> {client.email}
        </li>
        <li>
          <Phone className="inline-block mr-1" /> {client.phone}
        </li>
      </ul>
    </div>
  );
}

ClientInfo.propTypes = {
  client: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
};

export default ClientInfo;
