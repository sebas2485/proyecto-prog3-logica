import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ticket, TicketRelations, TipoTicket, Cliente} from '../models';
import {TipoTicketRepository} from './tipo-ticket.repository';
import {ClienteRepository} from './cliente.repository';

export class TicketRepository extends DefaultCrudRepository<
  Ticket,
  typeof Ticket.prototype.id,
  TicketRelations
> {

  public readonly tipoTicket: BelongsToAccessor<TipoTicket, typeof Ticket.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Ticket.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoTicketRepository') protected tipoTicketRepositoryGetter: Getter<TipoTicketRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Ticket, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.tipoTicket = this.createBelongsToAccessorFor('tipoTicket', tipoTicketRepositoryGetter,);
    this.registerInclusionResolver('tipoTicket', this.tipoTicket.inclusionResolver);
  }
}
