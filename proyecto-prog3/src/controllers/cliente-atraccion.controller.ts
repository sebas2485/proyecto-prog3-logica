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
Cliente,
AtraccionCliente,
Atraccion,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteAtraccionController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Atraccion through AtraccionCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atraccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Atraccion>,
  ): Promise<Atraccion[]> {
    return this.clienteRepository.atracciones(id).find(filter);
  }

  @post('/clientes/{id}/atraccions', {
    responses: {
      '200': {
        description: 'create a Atraccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atraccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {
            title: 'NewAtraccionInCliente',
            exclude: ['id'],
          }),
        },
      },
    }) atraccion: Omit<Atraccion, 'id'>,
  ): Promise<Atraccion> {
    return this.clienteRepository.atracciones(id).create(atraccion);
  }

  @patch('/clientes/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Cliente.Atraccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atraccion, {partial: true}),
        },
      },
    })
    atraccion: Partial<Atraccion>,
    @param.query.object('where', getWhereSchemaFor(Atraccion)) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.clienteRepository.atracciones(id).patch(atraccion, where);
  }

  @del('/clientes/{id}/atraccions', {
    responses: {
      '200': {
        description: 'Cliente.Atraccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Atraccion)) where?: Where<Atraccion>,
  ): Promise<Count> {
    return this.clienteRepository.atracciones(id).delete(where);
  }
}
