export const fetchPhoto = async (id: number) => {
  const res = await fetch(`https://picsum.photos/id/${id}/info`);
  if (!res.ok) {
    throw new Error('Failed to fetch photos');
  }
  return res.json();
};
