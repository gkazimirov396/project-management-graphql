import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PROJECT } from '../services/queries/project';

import ClientInfo from '../components/Client/ClientInfo';

import DeleteProjectButton from '../components/Project/DeleteProjectButton';
import EditProjectForm from '../components/Project/EditProjectForm';

import LoadingSpinner from '../components/ui/LoadingSpinner';

function ProjectDetailed() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-error">{error.message}</p>;

  return (
    <>
      {!loading && !error && (
        <section className="grid grid-cols-3 p-5 mx-auto">
          <div className="flex flex-col gap-5">
            <Link to=".." className="w-24 mb=4 btn btn-neutral btn-sm">
              Back
            </Link>

            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>

            <h5 className="mt-3">Project Status:</h5>
            <p className="text-xl leading-4">{data.project.status}</p>

            <div className="divider" />

            <ClientInfo client={data.project.client} />
          </div>

          <EditProjectForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} />
        </section>
      )}
    </>
  );
}

export default ProjectDetailed;
