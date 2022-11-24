import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AtraccionCliente} from '../models';
import {AtraccionClienteRepository} from '../repositories';

export class AtraccionClienteController {
  constructor(
    @repository(AtraccionClienteRepository)
    public atraccionClienteRepository : AtraccionClienteRepository,
  ) {}

  @post('/atraccion-clientes')
  @response(200, {
    description: 'AtraccionCliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(AtraccionCliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AtraccionCliente, {
            title: 'NewAtraccionCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    atraccionCliente: Omit<AtraccionCliente, 'id'>,
  ): Promise<AtraccionCliente> {
    return this.atraccionClienteRepository.create(atraccionCliente);
  }

  @get('/atraccion-clientes/count')
  @response(200, {
    description: 'AtraccionCliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AtraccionCliente) where?: Where<AtraccionCliente>,
  ): Promise<Count> {
    return this.atraccionClienteRepository.count(where);
  }

  @get('/atraccion-clientes')
  @response(200, {
    description: 'Array of AtraccionCliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AtraccionCliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AtraccionCliente) filter?: Filter<AtraccionCliente>,
  ): Promise<AtraccionCliente[]> {
    return this.atraccionClienteRepository.find(filter);
  }

  @patch('/atraccion-clientes')
  @response(200, {
    description: 'AtraccionCliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AtraccionCliente, {partial: true}),
        },
      },
    })
    atraccionCliente: AtraccionCliente,
    @param.where(AtraccionCliente) where?: Where<AtraccionCliente>,
  ): Promise<Count> {
    return this.atraccionClienteRepository.updateAll(atraccionCliente, where);
  }

  @get('/atraccion-clientes/{id}')
  @response(200, {
    description: 'AtraccionCliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AtraccionCliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AtraccionCliente, {exclude: 'where'}) filter?: FilterExcludingWhere<AtraccionCliente>
  ): Promise<AtraccionCliente> {
    return this.atraccionClienteRepository.findById(id, filter);
  }

  @patch('/atraccion-clientes/{id}')
  @response(204, {
    description: 'AtraccionCliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AtraccionCliente, {partial: true}),
        },
      },
    })
    atraccionCliente: AtraccionCliente,
  ): Promise<void> {
    await this.atraccionClienteRepository.updateById(id, atraccionCliente);
  }

  @put('/atraccion-clientes/{id}')
  @response(204, {
    description: 'AtraccionCliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() atraccionCliente: AtraccionCliente,
  ): Promise<void> {
    await this.atraccionClienteRepository.replaceById(id, atraccionCliente);
  }

  @del('/atraccion-clientes/{id}')
  @response(204, {
    description: 'AtraccionCliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.atraccionClienteRepository.deleteById(id);
  }
}
