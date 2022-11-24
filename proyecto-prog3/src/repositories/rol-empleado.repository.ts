import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {RolEmpleado, RolEmpleadoRelations} from '../models';

export class RolEmpleadoRepository extends DefaultCrudRepository<
  RolEmpleado,
  typeof RolEmpleado.prototype.id,
  RolEmpleadoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(RolEmpleado, dataSource);
  }
}
