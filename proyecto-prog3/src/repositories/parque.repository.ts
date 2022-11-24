import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Parque, ParqueRelations, Ciudad, Atraccion} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {AtraccionRepository} from './atraccion.repository';

export class ParqueRepository extends DefaultCrudRepository<
  Parque,
  typeof Parque.prototype.id,
  ParqueRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Parque.prototype.id>;

  public readonly atraccion: BelongsToAccessor<Atraccion, typeof Parque.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>,
  ) {
    super(Parque, dataSource);
    this.atraccion = this.createBelongsToAccessorFor('atraccion', atraccionRepositoryGetter,);
    this.registerInclusionResolver('atraccion', this.atraccion.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
