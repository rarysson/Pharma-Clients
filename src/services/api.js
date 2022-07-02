export async function fetchClients(page, items = 50) {
  const response = await fetch(
    `https://randomuser.me/api/?seed=pharma&nat=br&noinfo&page=${page}&results=${items}`
  );
  const data = await response.json();

  return data.results;
}
