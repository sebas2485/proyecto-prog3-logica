import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Atraccion, AtraccionRelations, Zona, Parque, Empleado, Cliente, AtraccionCliente} from '../models';
import {ZonaRepository} from './zona.repository';
import {ParqueRepository} from './parque.repository';
import {EmpleadoRepository} from './empleado.repository';
import {AtraccionClienteRepository} from './atraccion-cliente.repository';
import {ClienteRepository} from './cliente.repository';

export class AtraccionRepository extends DefaultCrudRepository<
  Atraccion,
  typeof Atraccion.prototype.id,
  AtraccionRelations
> {

  public readonly zona: BelongsToAccessor<Zona, typeof Atraccion.prototype.id>;

  public readonly parques: HasManyRepositoryFactory<Parque, typeof Atraccion.prototype.id>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Atraccion.prototype.id>;

  public readonly clientes: HasManyThroughRepositoryFactory<Cliente, typeof Cliente.prototype.id,
          AtraccionCliente,
          typeof Atraccion.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ZonaRepository') protected zonaRepositoryGetter: Getter<ZonaRepository>, @repository.getter('ParqueRepository') protected parqueRepositoryGetter: Getter<ParqueRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('AtraccionClienteRepository') protected atraccionClienteRepositoryGetter: Getter<AtraccionClienteRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Atraccion, dataSource);
    this.clientes = this.createHasManyThroughRepositoryFactoryFor('clientes', clienteRepositoryGetter, atraccionClienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.parques = this.createHasManyRepositoryFactoryFor('parques', parqueRepositoryGetter,);
    this.registerInclusionResolver('parques', this.parques.inclusionResolver);
    this.zona = this.createBelongsToAccessorFor('zona', zonaRepositoryGetter,);
    this.registerInclusionResolver('zona', this.zona.inclusionResolver);
  }
}
