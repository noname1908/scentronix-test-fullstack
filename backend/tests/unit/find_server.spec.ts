import { test } from '@japa/runner'
import findServer from 'App/UseCases/findServer'
import nock from 'nock'

const mockServers = [
  {
    url: 'https://does-not-work.perfume.new',
    priority: 1,
  },
  {
    url: 'https://gitlab.com',
    priority: 4,
  },
  {
    url: 'http://app.scnt.me',
    priority: 3,
  },
  {
    url: 'https://offline.scentronix.com',
    priority: 2,
  },
]

test.group('Find server', (group) => {
  // restore nock after each test
  group.each.setup(() => {
    // if (!nock.isActive) {
    //   console.log('dasdas')
    //   nock.activate()
    // }
    return () => nock.cleanAll()
  })

  test('should return the lowest priority server when all servers available', async ({
    assert,
  }) => {
    const lowestPriority = 4
    mockServers.forEach((server) => {
      nock(server.url).get('/').reply(200)
    })

    const server = await findServer(mockServers)

    assert.equal(server?.priority, lowestPriority)
  })

  test('should return the lowest priority server when at least one server available', async ({
    assert,
  }) => {
    const lowestPriority = 1
    mockServers.forEach((server) => {
      nock(server.url)
        .get('/')
        .reply(server.priority === lowestPriority ? 200 : 400)
    })

    const server = await findServer(mockServers)

    assert.equal(server?.priority, lowestPriority)
  })

  test('should return null when all servers offline', async ({ assert }) => {
    mockServers.forEach((server) => {
      nock(server.url).get('/').reply(400)
    })

    const server = await findServer(mockServers)

    assert.isNull(server)
  })

  test('should return the lowest priority server when some server delay over 5s', async ({
    assert,
  }) => {
    const lowestPriority = 1
    mockServers.forEach((server) => {
      nock(server.url)
        .get('/')
        .delay(server.priority === lowestPriority ? 0 : 6000) // some server delay over 5s
        .reply(200)
    })

    const server = await findServer(mockServers)

    assert.equal(server?.priority, lowestPriority)
  })
})
