import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';
import {RolEmpleado} from './rol-empleado.model';

@model()
export class Rol extends Entity {
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

  @hasMany(() => Empleado, {through: {model: () => RolEmpleado}})
  empleados: Empleado[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
