import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoDocumento, TipoDocumentoRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class TipoDocumentoRepository extends DefaultCrudRepository<
  TipoDocumento,
  typeof TipoDocumento.prototype.id,
  TipoDocumentoRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof TipoDocumento.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(TipoDocumento, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
