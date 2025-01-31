import { Hero } from '../types';

export const superheroService = {
  async fetchSuperheroes(): Promise<Hero[]> {
    try {
      const response = await fetch("http://localhost:3000/superheroes");
      
      // Verificar si la respuesta es JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server not responding with JSON");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        // Si es un error de conexión
        if (error.message === "Failed to fetch") {
          throw new Error("Cannot connect to the server. Please check if the backend is running.");
        }
        throw error;
      }
      throw new Error("An unknown error occurred");
    }
  },

  async createSuperhero(hero: Hero): Promise<Hero> {
    try {
      const response = await fetch("http://localhost:3000/superheroes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hero),
      });

      // Verificar si la respuesta es JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server not responding with JSON");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        // Si es un error de conexión
        if (error.message === "Failed to fetch") {
          throw new Error("Cannot connect to the server. Please check if the backend is running.");
        }
        throw error;
      }
      throw new Error("An unknown error occurred");
    }
  }
};