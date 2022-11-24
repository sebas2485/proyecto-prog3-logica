import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AtraccionCliente, AtraccionClienteRelations} from '../models';

export class AtraccionClienteRepository extends DefaultCrudRepository<
  AtraccionCliente,
  typeof AtraccionCliente.prototype.id,
  AtraccionClienteRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(AtraccionCliente, dataSource);
  }
}
