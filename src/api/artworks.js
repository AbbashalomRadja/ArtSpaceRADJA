import axios from 'axios';

const BASE_URL = 'https://6819c95b1ac1155635065be9.mockapi.io/api/artworks';

export async function getArtworks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch artworks');
  return await res.json();
}

export async function createArtwork(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create artwork');
  return await res.json();
}

export async function updateArtwork(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update artwork');
  return await res.json();
}

export async function deleteArtwork(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete artwork');
  return true;
}
