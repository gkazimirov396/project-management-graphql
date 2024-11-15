import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="min-h-screen hero">
      <div className="text-start hero-content">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            This is a homepage for the best project management solution on the
            internet. You can visit create new clients, which will be rendered in
            a table. As it is currently a simple application, it does not have a
            proper authentication system set up. Enjoy!
          </p>

          <Link to="/clients" className="text-white btn btn-primary">
            Create A New Client
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
