import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {RolEmpleado} from '../models';
import {RolEmpleadoRepository} from '../repositories';

export class RolEmpleadoController {
  constructor(
    @repository(RolEmpleadoRepository)
    public rolEmpleadoRepository : RolEmpleadoRepository,
  ) {}

  @post('/rol-empleados')
  @response(200, {
    description: 'RolEmpleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(RolEmpleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolEmpleado, {
            title: 'NewRolEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    rolEmpleado: Omit<RolEmpleado, 'id'>,
  ): Promise<RolEmpleado> {
    return this.rolEmpleadoRepository.create(rolEmpleado);
  }

  @get('/rol-empleados/count')
  @response(200, {
    description: 'RolEmpleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RolEmpleado) where?: Where<RolEmpleado>,
  ): Promise<Count> {
    return this.rolEmpleadoRepository.count(where);
  }

  @get('/rol-empleados')
  @response(200, {
    description: 'Array of RolEmpleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RolEmpleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RolEmpleado) filter?: Filter<RolEmpleado>,
  ): Promise<RolEmpleado[]> {
    return this.rolEmpleadoRepository.find(filter);
  }

  @patch('/rol-empleados')
  @response(200, {
    description: 'RolEmpleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolEmpleado, {partial: true}),
        },
      },
    })
    rolEmpleado: RolEmpleado,
    @param.where(RolEmpleado) where?: Where<RolEmpleado>,
  ): Promise<Count> {
    return this.rolEmpleadoRepository.updateAll(rolEmpleado, where);
  }

  @get('/rol-empleados/{id}')
  @response(200, {
    description: 'RolEmpleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RolEmpleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RolEmpleado, {exclude: 'where'}) filter?: FilterExcludingWhere<RolEmpleado>
  ): Promise<RolEmpleado> {
    return this.rolEmpleadoRepository.findById(id, filter);
  }

  @patch('/rol-empleados/{id}')
  @response(204, {
    description: 'RolEmpleado PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolEmpleado, {partial: true}),
        },
      },
    })
    rolEmpleado: RolEmpleado,
  ): Promise<void> {
    await this.rolEmpleadoRepository.updateById(id, rolEmpleado);
  }

  @put('/rol-empleados/{id}')
  @response(204, {
    description: 'RolEmpleado PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rolEmpleado: RolEmpleado,
  ): Promise<void> {
    await this.rolEmpleadoRepository.replaceById(id, rolEmpleado);
  }

  @del('/rol-empleados/{id}')
  @response(204, {
    description: 'RolEmpleado DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rolEmpleadoRepository.deleteById(id);
  }
}
