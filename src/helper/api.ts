const BASE_URL = "https://api.disneyapi.dev";

export async function getAllCharacters() {
  try {
    const response = await fetch(`${BASE_URL}/character`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all characters:", error);
    return null;
  }
}

export async function filterCharacter(queryParams: string) {
  try {
    const response = await fetch(`${BASE_URL}/character?${queryParams}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error filtering characters:", error);
    return null;
  }
}

export async function getOneCharacter(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error);
    return null;
  }
}
