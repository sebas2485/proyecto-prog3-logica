import {Entity, model, property} from '@loopback/repository';

@model()
export class RolEmpleado extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  empleadoId?: number;

  @property({
    type: 'number',
  })
  rolId?: number;

  constructor(data?: Partial<RolEmpleado>) {
    super(data);
  }
}

export interface RolEmpleadoRelations {
  // describe navigational properties here
}

export type RolEmpleadoWithRelations = RolEmpleado & RolEmpleadoRelations;
