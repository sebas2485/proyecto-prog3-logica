import {Entity, model, property, hasMany} from '@loopback/repository';
import {Atraccion} from './atraccion.model';

@model()
export class Zona extends Entity {
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

  @hasMany(() => Atraccion)
  atracciones: Atraccion[];

  constructor(data?: Partial<Zona>) {
    super(data);
  }
}

export interface ZonaRelations {
  // describe navigational properties here
}

export type ZonaWithRelations = Zona & ZonaRelations;
