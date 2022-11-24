import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Rol, RolRelations, Empleado, RolEmpleado} from '../models';
import {RolEmpleadoRepository} from './rol-empleado.repository';
import {EmpleadoRepository} from './empleado.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly empleados: HasManyThroughRepositoryFactory<Empleado, typeof Empleado.prototype.id,
          RolEmpleado,
          typeof Rol.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RolEmpleadoRepository') protected rolEmpleadoRepositoryGetter: Getter<RolEmpleadoRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Rol, dataSource);
    this.empleados = this.createHasManyThroughRepositoryFactoryFor('empleados', empleadoRepositoryGetter, rolEmpleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);

  }
}
