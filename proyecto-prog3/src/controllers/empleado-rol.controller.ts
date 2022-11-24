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
Empleado,
RolEmpleado,
Rol,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoRolController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/rols', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Rol through RolEmpleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Rol>,
  ): Promise<Rol[]> {
    return this.empleadoRepository.roles(id).find(filter);
  }

  @post('/empleados/{id}/rols', {
    responses: {
      '200': {
        description: 'create a Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rol)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {
            title: 'NewRolInEmpleado',
            exclude: ['id'],
          }),
        },
      },
    }) rol: Omit<Rol, 'id'>,
  ): Promise<Rol> {
    return this.empleadoRepository.roles(id).create(rol);
  }

  @patch('/empleados/{id}/rols', {
    responses: {
      '200': {
        description: 'Empleado.Rol PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {partial: true}),
        },
      },
    })
    rol: Partial<Rol>,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.empleadoRepository.roles(id).patch(rol, where);
  }

  @del('/empleados/{id}/rols', {
    responses: {
      '200': {
        description: 'Empleado.Rol DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.empleadoRepository.roles(id).delete(where);
  }
}
