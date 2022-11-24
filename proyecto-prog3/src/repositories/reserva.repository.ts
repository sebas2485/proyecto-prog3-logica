import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Reserva, ReservaRelations, TipoTicket} from '../models';
import {TipoTicketRepository} from './tipo-ticket.repository';

export class ReservaRepository extends DefaultCrudRepository<
  Reserva,
  typeof Reserva.prototype.id,
  ReservaRelations
> {

  public readonly tipoTickets: HasManyRepositoryFactory<TipoTicket, typeof Reserva.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoTicketRepository') protected tipoTicketRepositoryGetter: Getter<TipoTicketRepository>,
  ) {
    super(Reserva, dataSource);
    this.tipoTickets = this.createHasManyRepositoryFactoryFor('tipoTickets', tipoTicketRepositoryGetter,);
    this.registerInclusionResolver('tipoTickets', this.tipoTickets.inclusionResolver);
  }
}
