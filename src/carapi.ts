export const getCars = () => {
  return fetch(import.meta.env.VITE_API_URL)
  .then(response => {
    if (!response.ok)
      throw new Error("Error when fetching cars");
  
      return response.json();
  })
}

export const deleteCar = (url: string) => {
  return fetch(url, {
    method: "DELETE"
  })
  .then(response => {
    if (!response.ok)
      throw new Error("Error when deleting car");

    return response.json();
  })
}