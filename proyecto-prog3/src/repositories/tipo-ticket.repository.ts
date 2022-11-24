import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoTicket, TipoTicketRelations, Reserva, Ticket} from '../models';
import {ReservaRepository} from './reserva.repository';
import {TicketRepository} from './ticket.repository';

export class TipoTicketRepository extends DefaultCrudRepository<
  TipoTicket,
  typeof TipoTicket.prototype.id,
  TipoTicketRelations
> {

  public readonly reserva: BelongsToAccessor<Reserva, typeof TipoTicket.prototype.id>;

  public readonly tickets: HasManyRepositoryFactory<Ticket, typeof TipoTicket.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ReservaRepository') protected reservaRepositoryGetter: Getter<ReservaRepository>, @repository.getter('TicketRepository') protected ticketRepositoryGetter: Getter<TicketRepository>,
  ) {
    super(TipoTicket, dataSource);
    this.tickets = this.createHasManyRepositoryFactoryFor('tickets', ticketRepositoryGetter,);
    this.registerInclusionResolver('tickets', this.tickets.inclusionResolver);
    this.reserva = this.createBelongsToAccessorFor('reserva', reservaRepositoryGetter,);
    this.registerInclusionResolver('reserva', this.reserva.inclusionResolver);
  }
}
