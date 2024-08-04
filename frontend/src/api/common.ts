type FetchOptions = RequestInit;

export const fetchData = async <T>(url: string, options: FetchOptions = {}): Promise<T | null> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null; // Or handle the error appropriately
  }
};
