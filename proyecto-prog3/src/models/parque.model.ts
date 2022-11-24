import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Atraccion} from './atraccion.model';

@model()
export class Parque extends Entity {
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

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @belongsTo(() => Atraccion)
  atraccionId: number;

  constructor(data?: Partial<Parque>) {
    super(data);
  }
}

export interface ParqueRelations {
  // describe navigational properties here
}

export type ParqueWithRelations = Parque & ParqueRelations;
