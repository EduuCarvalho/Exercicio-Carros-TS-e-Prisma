import notFoundError from "../errors/notFoundError.js";
import conflictError from "../errors/conflictError.js";
import carRepository from "../repository/carRepository.js";

async function getCars() {
  const cars = await carRepository.getCars();
  return cars;
}

 async function getCar(id: number) {
  const car = await carRepository.getCar(id);
  if (!car) {
    throw notFoundError();
  }

  return car;
 }

async function upsertCar(id:number,model: string, licensePlate: string, year: number, color: string) {
  const car = await carRepository.getCarWithLicensePlate(licensePlate);
  if (car && car.id!==id) {
    throw conflictError(`Car with license plate ${licensePlate} already registered.`)
  }

  await carRepository.upsertCar(id,model, licensePlate, year, color);
}

async function deleteCar(id: number) {
  await getCar(id);
  await carRepository.deleteCar(id);
} 
const carService = {
  getCars,
  getCar,
  upsertCar,
  deleteCar 
}
export default carService;