import { useQuery } from '@apollo/client';

import { GET_PROJECTS } from '../services/queries/project';

import ProjectCard from '../components/Project/ProjectCard';
import AddProjectModal from '../components/Project/AddProjectModal';

import LoadingSpinner from '../components/ui/LoadingSpinner';

function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-error">{error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <AddProjectModal />
      {data.projects.length > 0 ? (
        <ul className="grid grid-cols-1 gap-3 list-none md:grid-cols-2 lg:grid-cols-3">
          {data.projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
      ) : (
        <p className="text-2xl">No Projects Yet.</p>
      )}
    </div>
  );
}

export default Projects;
