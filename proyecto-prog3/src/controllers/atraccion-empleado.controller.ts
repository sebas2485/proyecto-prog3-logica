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
  Atraccion,
  Empleado,
} from '../models';
import {AtraccionRepository} from '../repositories';

export class AtraccionEmpleadoController {
  constructor(
    @repository(AtraccionRepository) protected atraccionRepository: AtraccionRepository,
  ) { }

  @get('/atraccions/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of Atraccion has many Empleado',
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
    return this.atraccionRepository.empleados(id).find(filter);
  }

  @post('/atraccions/{id}/empleados', {
    responses: {
      '200': {
        description: 'Atraccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Atraccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInAtraccion',
            exclude: ['id'],
            optional: ['atraccionId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.atraccionRepository.empleados(id).create(empleado);
  }

  @patch('/atraccions/{id}/empleados', {
    responses: {
      '200': {
        description: 'Atraccion.Empleado PATCH success count',
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
    return this.atraccionRepository.empleados(id).patch(empleado, where);
  }

  @del('/atraccions/{id}/empleados', {
    responses: {
      '200': {
        description: 'Atraccion.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.atraccionRepository.empleados(id).delete(where);
  }
}
