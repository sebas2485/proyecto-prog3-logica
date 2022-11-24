import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Atraccion,
  Parque,
} from '../models';
import {AtraccionRepository} from '../repositories';

export class AtraccionParqueController {
  constructor(
    @repository(AtraccionRepository) protected atraccionRepository: AtraccionRepository,
  ) { }

  @get('/atraccions/{id}/parques', {
    responses: {
      '200': {
        description: 'Array of Atraccion has many Parque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parque)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Parque>,
  ): Promise<Parque[]> {
    return this.atraccionRepository.parques(id).find(filter);
  }

  @post('/atraccions/{id}/parques', {
    responses: {
      '200': {
        description: 'Atraccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parque)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Atraccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {
            title: 'NewParqueInAtraccion',
            exclude: ['id'],
            optional: ['atraccionId']
          }),
        },
      },
    }) parque: Omit<Parque, 'id'>,
  ): Promise<Parque> {
    return this.atraccionRepository.parques(id).create(parque);
  }

  @patch('/atraccions/{id}/parques', {
    responses: {
      '200': {
        description: 'Atraccion.Parque PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parque, {partial: true}),
        },
      },
    })
    parque: Partial<Parque>,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.atraccionRepository.parques(id).patch(parque, where);
  }

  @del('/atraccions/{id}/parques', {
    responses: {
      '200': {
        description: 'Atraccion.Parque DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Parque)) where?: Where<Parque>,
  ): Promise<Count> {
    return this.atraccionRepository.parques(id).delete(where);
  }
}
