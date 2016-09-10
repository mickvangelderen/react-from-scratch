import queryString from 'query-string'

const qs = queryString.parse(location.search)

export default {
  sessions: [
    {
      id: 'snaukx',
      startDate: '2016-01-01T00:00:00Z',
      userId: 'j3010t',
    }, {
      id: '6enql1',
      startDate: '2016-05-01T00:00:00Z',
      userId: 'h4am71'
    }
  ],
  users: [
    {
      id: 'j3010t',
      name: 'Mick van Gelderen'
    }, {
      id: 'h4am71',
      name: 'Andy van Gelderen'
    }
  ],
  items: [
    {
      id: 'fcqsxl',
      userId: 'j3010t',
      title: 'Groceries',
      description: 'Have to do the groceries.'
    }, {
      id: 'p2f8pp',
      userId: 'j3010t',
      title: 'Read Pattern Recognition book',
      description: 'Its in my bookcase you know...'
    }, {
      id: '9lsnmp',
      userId: 'h4am71',
      title: 'Buy bread',
      description: 'Have to do the groceries.'
    }, {
      id: 'byogzg',
      userId: 'h4am71',
      title: 'Play Dragon Age',
      description: 'Time for the inquisition!'
    }
  ],
  activeSessionId: qs.activeSessionId
}
