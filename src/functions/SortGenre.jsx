// Takes an array of shows and a genre ID, returns filtered shows matching that genre
export const filterByGenre = (shows, selectedGenre) => {
  // Return all shows if no genre is selected
  if (!selectedGenre) {
    return shows;
  }

  // Filter shows that include the selected genre ID
  // Convert selectedGenre to Number since it comes as a string from the select element
  return shows.filter((show) => show.genres.includes(Number(selectedGenre)));
};
