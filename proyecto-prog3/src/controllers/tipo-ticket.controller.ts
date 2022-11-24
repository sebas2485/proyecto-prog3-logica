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
import {TipoTicket} from '../models';
import {TipoTicketRepository} from '../repositories';

export class TipoTicketController {
  constructor(
    @repository(TipoTicketRepository)
    public tipoTicketRepository : TipoTicketRepository,
  ) {}

  @post('/tipo-tickets')
  @response(200, {
    description: 'TipoTicket model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoTicket)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTicket, {
            title: 'NewTipoTicket',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoTicket: Omit<TipoTicket, 'id'>,
  ): Promise<TipoTicket> {
    return this.tipoTicketRepository.create(tipoTicket);
  }

  @get('/tipo-tickets/count')
  @response(200, {
    description: 'TipoTicket model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoTicket) where?: Where<TipoTicket>,
  ): Promise<Count> {
    return this.tipoTicketRepository.count(where);
  }

  @get('/tipo-tickets')
  @response(200, {
    description: 'Array of TipoTicket model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoTicket, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoTicket) filter?: Filter<TipoTicket>,
  ): Promise<TipoTicket[]> {
    return this.tipoTicketRepository.find(filter);
  }

  @patch('/tipo-tickets')
  @response(200, {
    description: 'TipoTicket PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTicket, {partial: true}),
        },
      },
    })
    tipoTicket: TipoTicket,
    @param.where(TipoTicket) where?: Where<TipoTicket>,
  ): Promise<Count> {
    return this.tipoTicketRepository.updateAll(tipoTicket, where);
  }

  @get('/tipo-tickets/{id}')
  @response(200, {
    description: 'TipoTicket model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoTicket, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoTicket, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoTicket>
  ): Promise<TipoTicket> {
    return this.tipoTicketRepository.findById(id, filter);
  }

  @patch('/tipo-tickets/{id}')
  @response(204, {
    description: 'TipoTicket PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoTicket, {partial: true}),
        },
      },
    })
    tipoTicket: TipoTicket,
  ): Promise<void> {
    await this.tipoTicketRepository.updateById(id, tipoTicket);
  }

  @put('/tipo-tickets/{id}')
  @response(204, {
    description: 'TipoTicket PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoTicket: TipoTicket,
  ): Promise<void> {
    await this.tipoTicketRepository.replaceById(id, tipoTicket);
  }

  @del('/tipo-tickets/{id}')
  @response(204, {
    description: 'TipoTicket DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoTicketRepository.deleteById(id);
  }
}
