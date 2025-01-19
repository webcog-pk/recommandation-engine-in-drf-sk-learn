from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .models import Movies

def get_similar_movies(movie_id, top_n=5):
    movies = list(Movies.objects.all())
    movie_content = []
    for movie in movies:
        combined_content = f"{movie.overview}"
        combined_content += f"{','.join(movie.genres)}"
        combined_content += f"{movie.release_date}"
        combined_content += f"{movie.runtime}"
        combined_content += f"{movie.popularity}"
        combined_content += f"{movie.vote_average}"
        combined_content += f"{movie.vote_count}"
        movie_content.append(combined_content)
    

    vectorize = TfidfVectorizer(stop_words="english")

    tfidf_matrix = vectorize.fit_transform(movie_content)

    try:
        target_movie = Movies.objects.get(id=movie_id)
    except Movies.DoesNotExist:
        return []
    
    content_to_index = {movie.id: idx for idx,movie in enumerate(movies)}
    target_index = content_to_index.get(target_movie.id)

    cosine_sim = cosine_similarity(tfidf_matrix[target_index], tfidf_matrix).flatten()
    
    similar_indices = cosine_sim.argsort()[-top_n-1:-1][::-1]

    similar_indices = [i for i in similar_indices if i != target_index]

    similiar_movies = [movies[idx] for idx in similar_indices]

    return similiar_movies
