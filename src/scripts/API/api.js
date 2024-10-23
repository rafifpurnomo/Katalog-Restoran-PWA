const API_URL = "https://restaurant-api.dicoding.dev";

export async function getAllRestaurant() {
    try {
        const response = await fetch(`${API_URL}/list`, {
            method: "GET",
        });
        
        if (!response.ok) {
            throw new Error("Gagal mengambil data");
        }

        const result = await response.json();
        const cache = await caches.open('mensa-api');
        cache.put(`${API_URL}/list`, new Response(JSON.stringify(result)));

        return result.restaurants; 
    } catch (error) {
       
        const cache = await caches.match(`${API_URL}/list`);
        if (cache) {
            const cachedResponse = await cache.json();
            return cachedResponse.restaurants;
        }
        throw error; 
    }
}

export async function getDetailResto(id) {
    try {
        const response = await fetch(`${API_URL}/detail/${id}`, {
            method: "GET",
        });
        
        if (!response.ok) {
            throw new Error("Gagal mengambil data");
        }

        const result = await response.json();

        const cache = await caches.open('mensa-api-detail');
        cache.put(`${API_URL}/detail/${id}`, new Response(JSON.stringify(result)));

        return result.restaurant; 
    } catch (error) {
        const cache = await caches.match(`${API_URL}/detail/${id}`);
        if (cache) {
            const cachedResponse = await cache.json();
            return cachedResponse.restaurant; 
        }
        throw error; 
    }
}

export async function searchRestaurants(query) {
    try {
      const response = await fetch(`https://restaurant-api.dicoding.dev/search?q=${query}`);
      const data = await response.json();
      return data.restaurants;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return [];
    }
  }
