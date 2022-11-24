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
  TipoTicket,
} from '../models';
import {TicketRepository} from '../repositories';

export class TicketTipoTicketController {
  constructor(
    @repository(TicketRepository)
    public ticketRepository: TicketRepository,
  ) { }

  @get('/tickets/{id}/tipo-ticket', {
    responses: {
      '200': {
        description: 'TipoTicket belonging to Ticket',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoTicket)},
          },
        },
      },
    },
  })
  async getTipoTicket(
    @param.path.number('id') id: typeof Ticket.prototype.id,
  ): Promise<TipoTicket> {
    return this.ticketRepository.tipoTicket(id);
  }
}
