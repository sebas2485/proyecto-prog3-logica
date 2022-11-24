import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Zona, ZonaRelations, Atraccion} from '../models';
import {AtraccionRepository} from './atraccion.repository';

export class ZonaRepository extends DefaultCrudRepository<
  Zona,
  typeof Zona.prototype.id,
  ZonaRelations
> {

  public readonly atracciones: HasManyRepositoryFactory<Atraccion, typeof Zona.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>,
  ) {
    super(Zona, dataSource);
    this.atracciones = this.createHasManyRepositoryFactoryFor('atracciones', atraccionRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
  }
}
