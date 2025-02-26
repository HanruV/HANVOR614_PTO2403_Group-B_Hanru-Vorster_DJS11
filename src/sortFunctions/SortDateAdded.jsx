// Function to sort favorites based on their dateAdded property
// Takes an array of favorites and desired order ('newest' or 'oldest')
export const sortByDateAdded = (favorites, order = "newest") => {
  return [...favorites].sort((a, b) => {
    // Convert dateAdded strings to Date objects for comparison
    const dateA = new Date(a.dateAdded);
    const dateB = new Date(b.dateAdded);

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
