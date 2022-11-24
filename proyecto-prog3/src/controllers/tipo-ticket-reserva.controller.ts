import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoTicket,
  Reserva,
} from '../models';
import {TipoTicketRepository} from '../repositories';

export class TipoTicketReservaController {
  constructor(
    @repository(TipoTicketRepository)
    public tipoTicketRepository: TipoTicketRepository,
  ) { }

  @get('/tipo-tickets/{id}/reserva', {
    responses: {
      '200': {
        description: 'Reserva belonging to TipoTicket',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reserva)},
          },
        },
      },
    },
  })
  async getReserva(
    @param.path.number('id') id: typeof TipoTicket.prototype.id,
  ): Promise<Reserva> {
    return this.tipoTicketRepository.reserva(id);
  }
}
