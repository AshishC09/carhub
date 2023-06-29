import Image from "next/image";

import { CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import CarCard from "@/components/CarCard";
import { fetchCars } from "@/utils";
import { CarProps, FilterProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({ searchParams }) {
  const fetchedCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
  const isDataEmpty =
    !fetchedCars || !Array.isArray(fetchedCars) || fetchedCars.length < 1;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars that you might like.</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="Fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {fetchedCars?.map((car: CarProps) => (
                <CarCard car={car} key={car.class} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > fetchedCars?.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops no cars</h2>
            <p>{fetchedCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
