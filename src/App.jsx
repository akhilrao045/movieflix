import { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard'; 
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';
import TrendingCarousel from './components/TrendingCarousel';
import Navbar from './components/Navbar';
import AllTimePopular from './components/AllTimePopular';



const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};


const App = () => { 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
    const [movieList,   setmovieList]    = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading,   setIsLoading]    = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

 const fetchMovies = async (query = '') => {
  setIsLoading(true);
  setErrorMessage('');


  try {
    const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    if(data.Response === "False"){
      setErrorMessage(data.Error || "Failed to fetch movies");
      setmovieList([]);
      return;
    }

    setmovieList(data.results || []);
    if(query && data.results.length > 0){
      await updateSearchCount(query,data.results[0]);
    }

  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
    setErrorMessage('Error fetching movies. Please try again later.')
  }finally {
    setIsLoading(false);
  }
 }

 const loadTrendingMovies = async () => {
  try {
    const movies = await getTrendingMovies();

    setTrendingMovies(movies);

  }catch (error){
    console.error(`Error fetching trending movies: ${error}`);  
  }
 }
  
 
  useEffect(() =>{  
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
 }, []);


  return (
    <main>
      <Navbar />  
      <div className="pattern"  />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span>You'll Enjoy without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length > 0 && (
  <section id="trending" className="trending">
    <h2 className="text-2xl font-semibold mb-2 text-white">Trending Movies</h2>
    <TrendingCarousel movies={trendingMovies} />
  </section>
)}

{trendingMovies.length > 0 && (
  <AllTimePopular movies={trendingMovies} />
)}



<section id="all" className="all-movies">
  <h2 className="text-2xl font-semibold mb-2 text-white">All Movies</h2>

  {isLoading ? (
    <Spinner />
  ) : errorMessage ? (
    <p className="text-red-500">{errorMessage}</p>
  ) : (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movieList.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )}
</section>


        <h1 className="text-white">{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App