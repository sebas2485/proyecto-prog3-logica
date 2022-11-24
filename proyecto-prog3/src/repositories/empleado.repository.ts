import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Atraccion, Rol, RolEmpleado} from '../models';
import {AtraccionRepository} from './atraccion.repository';
import {RolEmpleadoRepository} from './rol-empleado.repository';
import {RolRepository} from './rol.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly atraccion: BelongsToAccessor<Atraccion, typeof Empleado.prototype.id>;

  public readonly roles: HasManyThroughRepositoryFactory<Rol, typeof Rol.prototype.id,
          RolEmpleado,
          typeof Empleado.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AtraccionRepository') protected atraccionRepositoryGetter: Getter<AtraccionRepository>, @repository.getter('RolEmpleadoRepository') protected rolEmpleadoRepositoryGetter: Getter<RolEmpleadoRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Empleado, dataSource);
    this.roles = this.createHasManyThroughRepositoryFactoryFor('roles', rolRepositoryGetter, rolEmpleadoRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
    this.atraccion = this.createBelongsToAccessorFor('atraccion', atraccionRepositoryGetter,);
    this.registerInclusionResolver('atraccion', this.atraccion.inclusionResolver);
  }
}
