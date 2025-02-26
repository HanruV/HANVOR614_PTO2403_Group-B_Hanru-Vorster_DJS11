// Function to sort shows based on their 'updated' date
// Takes an array of shows and desired order ('newest' or 'oldest')
export const sortByLastUpdated = (shows, order = "newest") => {
  return [...shows].sort((a, b) => {
    // Convert the updated strings to Date objects for comparison
    const dateA = new Date(a.updated);
    const dateB = new Date(b.updated);

    // For newest first (descending order)
    // Subtract dateA from dateB to get newer dates first
    if (order === "newest") {
      return dateB - dateA;
    }
    // For oldest first (ascending order)
    // Subtract dateB from dateA to get older dates first
    return dateA - dateB;
  });
};
