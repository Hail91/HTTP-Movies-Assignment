import React, {useState, useEffect } from 'react';
import axios from 'axios';

const initialData = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialData);

    const editedMovie = props.match.params.id;
    
    useEffect(() => {
        const movieToEdit = props.movies.find(
            i => `${i.id}` === editedMovie
        );
        console.log(props.movies, movieToEdit)
        if (movieToEdit) {
            setMovie(movieToEdit)
        }
    }, [props.movies, editedMovie]);

    const handleChanges = event => {
        event.persist();
        setMovie({...movie, [event.target.name]: event.target.value });
    }

    const deleteMovie = event => {
        event.preventDefault();
        axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
        .then(res => {
          console.log(res)
          setTimeout(props.history.push('/'), 0);
          window.location.href = window.location.href;
        })
        .catch(error => console.log(error));
      };
    
    const submitEdit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                const newList = props.movies.map(item => {
                    if (item.id === movie.id) {
                      return (item = res.data);
                    } else {
                      return item;
                    }
                  });
                  props.setMovies(newList);
        
                })
                .catch(err => console.log(err));
                props.history.push(`/movies/${movie.id}`)
                window.location.href = window.location.href;
            };
          
    return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={submitEdit}>
        <input
          type="text"
          name="title"
          onChange={handleChanges}
          placeholder="Movie Title"
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={handleChanges}
          placeholder="Movie Director"
          value={movie.director}
        />
        <input
          type="number"
          name="metascore"
          onChange={handleChanges}
          placeholder="Movie Metascore"
          value={movie.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={handleChanges}
          placeholder="Add a star"
          value={movie.stars}
        />
        <button>Update</button>
        <button onClick={deleteMovie}>Delete</button>
      </form>
    </div>
  );
}

export default UpdateMovie;

