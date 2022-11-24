import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Rol,
RolEmpleado,
Empleado,
} from '../models';
import {RolRepository} from '../repositories';

export class RolEmpleadoController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Rol has many Empleado through RolEmpleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.rolRepository.empleados(id).find(filter);
  }

  @post('/rols/{id}/empleados', {
    responses: {
      '200': {
        description: 'create a Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Rol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInRol',
            exclude: ['id'],
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.rolRepository.empleados(id).create(empleado);
  }

  @patch('/rols/{id}/empleados', {
    responses: {
      '200': {
        description: 'Rol.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.rolRepository.empleados(id).patch(empleado, where);
  }

  @del('/rols/{id}/empleados', {
    responses: {
      '200': {
        description: 'Rol.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.rolRepository.empleados(id).delete(where);
  }
}
