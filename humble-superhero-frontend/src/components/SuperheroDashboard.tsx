import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Hero } from "../types";
import { superheroService } from "../services/api";

const INITIAL_HERO_STATE: Hero = {
  name: "",
  superpower: "",
  humilityScore: 0,
};

const SuperheroDashboard = () => {
  const [superheroes, setSuperheroes] = useState<Hero[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [newHero, setNewHero] = useState<Hero>(INITIAL_HERO_STATE);

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    try {
      setIsLoading(true);
      const data = await superheroService.fetchSuperheroes();
      setSuperheroes(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewHero((prev) => ({
      ...prev,
      [name]: name === "humilityScore" ? Number(value) : value,
    }));
  };

  const validateHero = (hero: Hero): boolean => {
    if (!hero.name.trim()) return false;
    if (!hero.superpower.trim()) return false;
    if (hero.humilityScore < 1 || hero.humilityScore > 10) return false;
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateHero(newHero)) {
      setError("Please fill all fields correctly");
      return;
    }

    try {
      setIsLoading(true);
      await superheroService.createSuperhero(newHero);
      setNewHero(INITIAL_HERO_STATE);
      await fetchSuperheroes();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>Add New Humble Superhero</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Superhero Name"
              value={newHero.name}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="superpower"
              placeholder="Superpower"
              value={newHero.superpower}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="humilityScore"
              placeholder="Humility Score (1-10)"
              value={newHero.humilityScore}
              onChange={handleInputChange}
              required
              min="1"
              max="10"
              disabled={isLoading}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Superhero"}
          </button>
        </form>

        {error && (
          <div className="alert error">
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="card">
        <h2>Humble Superheroes</h2>
        <div className="superheroes-list">
          {superheroes.map((hero, index) => (
            <div key={index} className="hero">
              <div className="hero-info">
                <h3>{hero.name}</h3>
                <p>Superpower: {hero.superpower}</p>
              </div>
              <div className="humility">
                <span>Humility: {hero.humilityScore}/10</span>
              </div>
            </div>
          ))}
          {superheroes.length === 0 && !isLoading && (
            <p className="no-heroes">No superheroes added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperheroDashboard;