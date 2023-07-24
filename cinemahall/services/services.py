import requests


def tmdb_data(imdb_id):
    url = f"https://api.themoviedb.org/3/find/tt{imdb_id}?external_source=imdb_id"
    print(imdb_id)
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWNhYmRiMTc1MGNiYTNkMDZjZGMxMGY3NGQyMDY1ZSIsInN1YiI6IjY0YjNiYWI4ZTBjYTdmMDE0NDJhNTRhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4wyJLn2PQp93N24qEMRzzZaGYPzfEqZpXYNVmh9v1Mc"
    }

    response = requests.get(url, headers=headers)
    print(response.json())
    #print(response.json()['movie_results'][0])
    return (response.json()['movie_results'][0])