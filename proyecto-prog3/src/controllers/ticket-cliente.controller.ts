import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ticket,
  Cliente,
} from '../models';
import {TicketRepository} from '../repositories';

export class TicketClienteController {
  constructor(
    @repository(TicketRepository)
    public ticketRepository: TicketRepository,
  ) { }

  @get('/tickets/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Ticket',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Ticket.prototype.id,
  ): Promise<Cliente> {
    return this.ticketRepository.cliente(id);
  }
}
