import { BlingApiException } from '../exceptions/bling-api.exception'
import { BlingInternalException } from '../exceptions/bling-internal.exception'
import {
  IBlingRepository,
  IDefaultHeaders,
  IDefaultParams,
  IDestroyOptions,
  IIndexOptions,
  IReplaceOptions,
  IShowOptions,
  IStoreOptions,
  IUpdateOptions
} from './bling.repository.interface'

interface IBlingRepositoryProps {
  /**
   * A URL base para chamada da API.
   */
  baseUrl: string

  /**
   * O _token_ de autenticação.
   */
  accessToken: string
}

/**
 * Repositório para acesso à API do Bling.
 */
export class BlingRepository implements IBlingRepository {
  /** @property props Propriedades da classe. */
  private props: IBlingRepositoryProps

  /**
   * Constrói o objeto.
   *
   * @param props As propriedades da classe.
   */
  constructor(props: IBlingRepositoryProps) {
    this.props = props
  }

  /**
   * Faz uma requisição HTTP a um endpoint específico utilizando o método HTTP, parâmetros, headers e dados do corpo fornecidos.
   *
   * @template T - O tipo de resposta esperado da requisição.
   * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} method - O método HTTP a ser utilizado na requisição.
   * @param {string} endpoint - O endpoint para o qual a requisição será enviada, anexado à URL base.
   * @param {Object} options - Parâmetros opcionais, headers e dados do corpo para a requisição.
   * @param {IDefaultParams} [options.params] - Parâmetros de consulta a serem anexados à URL da requisição.
   * @param {IDefaultHeaders} [options.headers] - Headers personalizados a serem incluídos na requisição.
   * @param {unknown} [options.data] - Os dados do corpo a serem enviados com a requisição.
   * @return {Promise<T>} Retorna uma promise que resolve para a resposta HTTP, opcionalmente incluindo headers na resposta se especificado.
   * @throws {BlingApiException} Lança uma exceção se a resposta HTTP não for bem-sucedida.
   * @throws {BlingInternalException} Lança uma exceção se a requisição HTTP não puder ser realizada.
   */
  private call<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    endpoint: string,
    options: {
      params?: IDefaultParams
      headers?: IDefaultHeaders
      data?: unknown
    }
  ): Promise<T> {
    const url = new URL(`${this.props.baseUrl}${endpoint}`)
    url.search = new URLSearchParams(options.params as any).toString()

    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.accessToken}`,
        ...options.headers
      },
      body: options.data ? JSON.stringify(options.data) : undefined
    })
      .then(async (response) => {
        const data = await response.json()
        if (response.ok) {
          return (
            options.headers?.shouldIncludeHeadersInResponse
              ? { headers: response.headers, ...data }
              : data
          ) as T
        } else {
          throw new BlingApiException(data)
        }
      })
      .catch((_) => {
        throw new BlingInternalException(
          `Não foi possível realizar a chamada HTTP: ${method} ${endpoint}`
        )
      })
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async index<
    IIndexBody,
    IIndexResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(
    options: IIndexOptions<IIndexBody, IParams, IHeaders>
  ): Promise<IIndexResponse> {
    return await this.call<IIndexResponse>('GET', options.endpoint, {
      params: options.params,
      headers: options.headers,
      data: options.body
    })
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async show<
    IShowResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(options: IShowOptions<IParams, IHeaders>): Promise<IShowResponse> {
    const endpoint = `${options.endpoint}/${options.id}`
    return await this.call<IShowResponse>('GET', endpoint, {
      params: options.params,
      headers: options.headers
    })
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async store<
    IStoreBody,
    IStoreResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(
    options: IStoreOptions<IStoreBody, IParams, IHeaders>
  ): Promise<IStoreResponse> {
    return await this.call<IStoreResponse>('POST', options.endpoint, {
      params: options.params,
      headers: options.headers,
      data: options.body
    })
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async update<
    IUpdateBody,
    IUpdateResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(
    options: IUpdateOptions<IUpdateBody, IParams, IHeaders>
  ): Promise<IUpdateResponse> {
    const endpoint = `${options.endpoint}/${options.id}`
    return await this.call<IUpdateResponse>('PATCH', endpoint, {
      params: options.params,
      headers: options.headers,
      data: options.body
    })
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async replace<
    IReplaceBody,
    IReplaceResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(
    options: IReplaceOptions<IReplaceBody, IParams, IHeaders>
  ): Promise<IReplaceResponse> {
    const endpoint = `${options.endpoint}/${options.id}`
    return await this.call<IReplaceResponse>('PUT', endpoint, {
      params: options.params,
      headers: options.headers,
      data: options.body
    })
  }

  /**
   * @inheritDoc
   *
   * @throws {BlingApiException|BlingInternalException}
   */
  public async destroy<
    IDestroyResponse,
    IParams extends IDefaultParams = IDefaultParams,
    IHeaders extends IDefaultHeaders = IDefaultHeaders
  >(options: IDestroyOptions<IParams, IHeaders>): Promise<IDestroyResponse> {
    const endpoint = `${options.endpoint}/${options.id}`
    return await this.call<IDestroyResponse>('DELETE', endpoint, {
      params: options.params,
      headers: options.headers
    })
  }
}
