const AllTimePopular = ({ movies }) => {
    return (
      <section className="py-6 overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4 text-white px-4">All Time Popular 🍿</h2>
        
        <div className="whitespace-nowrap animate-marquee flex gap-6">
          {movies.map((movie) => (
            <div key={movie.$id} className="inline-block w-40 flex-shrink-0">
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="rounded-lg w-full h-60 object-cover"
              />
            </div>
          ))}
  
          {/* Duplicate items for infinite loop */}
          {movies.map((movie) => (
            <div key={`${movie.$id}-duplicate`} className="inline-block w-40 flex-shrink-0">
              <img
                src={movie.poster_url}
                alt={movie.title}
                className="rounded-lg w-full h-60 object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default AllTimePopular;
  