import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Zona} from './zona.model';
import {Parque} from './parque.model';
import {Empleado} from './empleado.model';
import {Cliente} from './cliente.model';
import {AtraccionCliente} from './atraccion-cliente.model';

@model()
export class Atraccion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  minEdad: number;

  @property({
    type: 'number',
    required: true,
  })
  minEstatura: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Zona)
  zonaId: number;

  @hasMany(() => Parque)
  parques: Parque[];

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @hasMany(() => Cliente, {through: {model: () => AtraccionCliente}})
  clientes: Cliente[];
  

  constructor(data?: Partial<Atraccion>) {
    super(data);
  }
}

export interface AtraccionRelations {
  // describe navigational properties here
}

export type AtraccionWithRelations = Atraccion & AtraccionRelations;
