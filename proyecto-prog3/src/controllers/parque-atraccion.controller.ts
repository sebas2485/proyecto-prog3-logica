import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Parque,
  Atraccion,
} from '../models';
import {ParqueRepository} from '../repositories';

export class ParqueAtraccionController {
  constructor(
    @repository(ParqueRepository)
    public parqueRepository: ParqueRepository,
  ) { }

  @get('/parques/{id}/atraccion', {
    responses: {
      '200': {
        description: 'Atraccion belonging to Parque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atraccion)},
          },
        },
      },
    },
  })
  async getAtraccion(
    @param.path.number('id') id: typeof Parque.prototype.id,
  ): Promise<Atraccion> {
    return this.parqueRepository.atraccion(id);
  }
}
