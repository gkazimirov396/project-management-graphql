import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  return (
    <li className="mb-3 shadow-xl card card-compact w-96 bg-base-100">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h5 className="card-title">{project.name}</h5>
          <div className="justify-end card-actions">
            <Link className="btn btn-neutral" to={`/projects/${project.id}`}>
              View
            </Link>
          </div>
        </div>
        <p className="text-sm">
          Status: <strong>{project.status}</strong>
        </p>
      </div>
    </li>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['Not Started', 'In Progress', 'Completed'])
      .isRequired,
  }).isRequired,
};

export default ProjectCard;
