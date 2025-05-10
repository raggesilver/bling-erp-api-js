import { ContatosTipos } from '..'
import { InMemoryBlingRepository } from '../../../repositories/bling-in-memory.repository'
import getResponse from './get-response'

describe('Contatos - Tipos entity', () => {
  let repository: InMemoryBlingRepository
  let entity: ContatosTipos

  beforeEach(() => {
    repository = new InMemoryBlingRepository()
    entity = new ContatosTipos(repository)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should get successfully', async () => {
    const spy = vi.spyOn(repository, 'index')
    repository.setResponse(getResponse)

    const response = await entity.get()

    expect(spy).toHaveBeenCalledWith({
      endpoint: 'contatos/tipos'
    })
    expect(response).toBe(getResponse)
  })
})
