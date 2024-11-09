import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Country } from './models/country.model';

@Injectable()
export class CountryService {
  constructor(@InjectModel(Country) private countryModel: typeof Country) {}

  async create(createCountryDto: CreateCountryDto) {
    return await this.countryModel.create(createCountryDto);
  }

  async findAll() {
    return await this.countryModel.findAll();
  }

  async findOne(id: number) {
    const country = await this.countryModel.findByPk(id);
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return country;
  }

  async findCountryByName(name: string) {
    const country = await this.countryModel.findOne({ where: { name } });
    if (!country) {
      throw new NotFoundException(`Country with name ${name} not found`);
    }
    return country;
  }

  async update(
    id: number,
    updateCountryDto: UpdateCountryDto,
  ): Promise<Country> {
    const country = await this.findOne(id);
    await country.update(updateCountryDto);
    return country;
  }

  async remove(id: number): Promise<void> {
    const country = await this.findOne(id);
    await country.destroy();
  }
}
