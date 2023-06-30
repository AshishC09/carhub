import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filter: FilterProps) {
  const { model, year, fuel, limit, manufacturer } = filter;
  const baseUrl = `https://${process.env.CARS_API_HOST}/v1/cars?model=${model}&make=${manufacturer}&year=${year}&fuel_type=${fuel}&limit=${limit}`;
  const headers = {
    "X-RapidAPI-Key": process.env.CARS_API_KEY || "",
    "X-RapidAPI-Host": process.env.CARS_API_HOST || "",
  };

  try {
    const response = await fetch(baseUrl, {
      headers,
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const IMAGIN_URL = process.env.IMAGIN_URL || "";

  const url = new URL(IMAGIN_URL || "https://cdn.imagin.studio/getimage");

  const { make, year, model } = car;

  url.searchParams.append("customer", process.env.IMAGIN_KEY || "");
  url.searchParams.append("make", make);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return url.toString();
};
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePerPricePay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePerPricePay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
