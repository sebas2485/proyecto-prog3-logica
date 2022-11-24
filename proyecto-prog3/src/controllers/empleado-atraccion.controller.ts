import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Atraccion,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoAtraccionController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/atraccion', {
    responses: {
      '200': {
        description: 'Atraccion belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atraccion)},
          },
        },
      },
    },
  })
  async getAtraccion(
    @param.path.number('id') id: typeof Empleado.prototype.id,
  ): Promise<Atraccion> {
    return this.empleadoRepository.atraccion(id);
  }
}
