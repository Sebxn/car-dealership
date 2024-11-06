import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // },
    
    ]

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car con id '${id}' no encontrado`);

        return car;
    }

    create(createCarDto: CreateCarDto) {

        const car: Car = {
            id: uuid(),
            ...createCarDto // <-- es lo mismo q lo de abajo, este exparce sus propiedades
            // brand: createCarDto.brand,
            // model: createCarDto.model
        }
        
        this.cars.push(car);

        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        let carDB = this.findOneById(id);
        this.cars = this.cars.map( car => {
            if (car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                }
                return carDB;
            }
            return car;
        })
        return carDB;
    }

    delete(id: string) {
        this.findOneById(id);
        this.cars = this.cars.filter( cars => cars.id !== id)
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars
    }
}