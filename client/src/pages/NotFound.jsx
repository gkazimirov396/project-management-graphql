import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-5">
      <AlertTriangle className="text-error" size="5em" />

      <h1 className="text-4xl text-error">404</h1>
      <p className="text-xl leading-4">Sorry, this page does not exist</p>

      <Link
        to="/"
        className="text-white border-none btn btn-primary hover:opacity-90"
      >
        Go Back
      </Link>
    </div>
  );
}

export default NotFound;
