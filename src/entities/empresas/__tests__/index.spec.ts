import { Empresas } from '..'
import { InMemoryBlingRepository } from '../../../repositories/bling-in-memory.repository'
import { IMeResponse } from '../interfaces/me.interface'
import meResponse from './me-response'

describe('Empresas entity', () => {
  let repository: InMemoryBlingRepository
  let entity: Empresas

  beforeEach(() => {
    repository = new InMemoryBlingRepository()
    entity = new Empresas(repository)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should get successfully', async () => {
    const spy = vi.spyOn(repository, 'index')
    repository.setResponse(meResponse)

    const response = await entity.me()

    expect(spy).toHaveBeenCalledWith({
      endpoint: 'empresas/me/dados-basicos'
    })
    expect(response).toBe(meResponse)

    const typingResponseTest: IMeResponse = meResponse
    expect(typingResponseTest).toBe(meResponse)
  })
})
