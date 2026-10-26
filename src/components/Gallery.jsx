
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import useFetchPhotos from "../hooks/useFetchPhotos";
import favouritesReducer, {
  initialFavourites,
} from "../reducers/favouritesReducer";

import SearchBar from "./SearchBar";
import PhotoCard from "./PhotoCard";

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  console.log({ photos, loading, error });
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    initialFavourites
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({
      type: "TOGGLE_FAVOURITE",
      payload: photoId,
    });
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-800"
          role="status"
          aria-label="Loading photos"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <p className="text-red-600">Failed to load photos: {error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto mb-8 max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Photo Gallery
        </h1>

        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Gallery;
