// Function to sort an array of items based on their title in either ascending or descending order
export const sortByTitle = (items, order = "asc") => {
  // Create a copy of the original array to avoid modifying it directly
  return [...items].sort((a, b) => {
    // If the order is ascending, compare titles in ascending order
    if (order === "asc") {
      return a.title.localeCompare(b.title);
    }
    // If the order is descending, compare titles in descending order
    return b.title.localeCompare(a.title);
  });
};
