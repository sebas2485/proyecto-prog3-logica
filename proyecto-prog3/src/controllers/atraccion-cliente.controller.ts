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
AtraccionCliente,
Cliente,
} from '../models';
import {AtraccionRepository} from '../repositories';

export class AtraccionClienteController {
  constructor(
    @repository(AtraccionRepository) protected atraccionRepository: AtraccionRepository,
  ) { }

  @get('/atraccions/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Atraccion has many Cliente through AtraccionCliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.atraccionRepository.clientes(id).find(filter);
  }

  @post('/atraccions/{id}/clientes', {
    responses: {
      '200': {
        description: 'create a Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Atraccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInAtraccion',
            exclude: ['id'],
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.atraccionRepository.clientes(id).create(cliente);
  }

  @patch('/atraccions/{id}/clientes', {
    responses: {
      '200': {
        description: 'Atraccion.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.atraccionRepository.clientes(id).patch(cliente, where);
  }

  @del('/atraccions/{id}/clientes', {
    responses: {
      '200': {
        description: 'Atraccion.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.atraccionRepository.clientes(id).delete(where);
  }
}
