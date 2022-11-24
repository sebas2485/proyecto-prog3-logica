import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, TipoDocumento, Ticket, Atraccion, AtraccionCliente} from '../models';
import {TipoDocumentoRepository} from './tipo-documento.repository';
import {TicketRepository} from './ticket.repository';
import {AtraccionClienteRepository} from './atraccion-cliente.repository';
import {AtraccionRepository} from './atraccion.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly tipoDocumento: BelongsToAccessor<TipoDocumento, typeof Cliente.prototype.id>;

  public readonly tickets: HasManyRepositoryFactory<Ticket, typeof Cliente.prototype.id>;

  public readonly atracciones: HasManyThroughRepositoryFactory<Atraccion, typeof Atraccion.prototype.id,
          AtraccionCliente,
          typeof Cliente.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoDocumentoRepository') protected tipoDocumentoRepositoryGetter: Getter<TipoDocumentoRepository>, @repository.getter('TicketRepository') protected ticketRepositoryGetter: Getter<TicketRepository>, @repository.getter('AtraccionClienteRepository') protected atraccionClienteRepositoryGetter: Getter<AtraccionClienteRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>,
  ) {
    super(Cliente, dataSource);
    this.atracciones = this.createHasManyThroughRepositoryFactoryFor('atracciones', atraccionRepositoryGetter, atraccionClienteRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.tickets = this.createHasManyRepositoryFactoryFor('tickets', ticketRepositoryGetter,);
    this.registerInclusionResolver('tickets', this.tickets.inclusionResolver);
    this.tipoDocumento = this.createBelongsToAccessorFor('tipoDocumento', tipoDocumentoRepositoryGetter,);
    this.registerInclusionResolver('tipoDocumento', this.tipoDocumento.inclusionResolver);
  }
}
