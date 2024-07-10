import axios from 'axios'
import _ from 'lodash'

interface Server {
  url: string
  priority: number
}

function delay(timeout: number, val: any) {
  return new Promise((_resolve, reject) => {
    setTimeout(reject.bind(null, val), timeout)
  })
}

function raceAllSettled(promises: Promise<any>[], timeoutTime: number, timeoutVal: any) {
  return Promise.allSettled(
    promises.map((p) => {
      return Promise.race([p, delay(timeoutTime, timeoutVal)])
    })
  )
}

export default async function findServer(servers: Server[]): Promise<Server | null> {
  // sort servers in ascending order by priority
  const sortedServers = _.sortBy(servers, ['priority'])

  // execute requests in parallel
  const results = await raceAllSettled(
    sortedServers.map((server) => axios.get(server.url)),
    5000,
    null
  )

  const serverIndex = _.findLastIndex(results, { status: 'fulfilled' })
  return sortedServers[serverIndex] ?? null
}
