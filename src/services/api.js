export async function fetchClients(page) {
  const response = await fetch(
    `https://randomuser.me/api/?seed=pharma&noinfo&page=${page}&results=50`
  );
  const data = await response.json();

  return data.results;
}
