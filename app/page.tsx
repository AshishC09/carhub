"use client";

import { CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import CarCard from "@/components/CarCard";
import { fetchCars } from "@/utils";
import { CarProps, FilterProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [loadedCars, setLoadedCars] = useState<Array<CarProps>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<undefined | string | any>();

  // Search States
  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState();

  // Filter States
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  // Pagination States
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    getCars();
  }, [model, manufacturer, fuel, limit, year]);
  const getCars = async () => {
    setIsLoading(true);
    try {
      const loadedCars = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || "",
      });

      setLoadedCars(loadedCars);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars that you might like.</p>
        </div>

        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="Fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {loadedCars.length > 0 && (
          <section>
            <div className="home__cars-wrapper">
              {loadedCars?.map((car: CarProps) => (
                <CarCard car={car} key={car.make + car.city_mpg} />
              ))}
            </div>
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > loadedCars.length}
              setLimit={setLimit}
            />
          </section>
        )}
        {error && (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops no cars</h2>
            <p>{error}</p>
          </div>
        )}
        {isLoading && !error && (
          <div className="mt-16 w-full flex-center">
            <Image
              src={"/tire.svg"}
              width={50}
              height={50}
              alt="loading spinner"
              className="object-contain rotating-animation"
            />
          </div>
        )}
      </div>
    </main>
  );
}
