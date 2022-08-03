import utils from './chart.utils'
import { SessionStatsWithDate } from '../../../../types/api'

const dataSet: SessionStatsWithDate[] = [
  {
    date: '',
    count: 1,
    countConsumers: 2,
    sumBytesReceived: 3,
    sumBytesSent: 4,
    sumDuration: 5,
    sumTokens: 6,
  },
  {
    date: '',
    count: 10,
    countConsumers: 20,
    sumBytesReceived: 30,
    sumBytesSent: 40,
    sumDuration: 50,
    sumTokens: 60,
  },
  {
    date: '',
    count: 100,
    countConsumers: 200,
    sumBytesReceived: 300,
    sumBytesSent: 400,
    sumDuration: 500,
    sumTokens: 600,
  },
]

test('stat totals', () => {
  // given
  const statsWithByteTotal = utils.calculateDisplayTotals(dataSet)

  // expect
  expect(statsWithByteTotal.count).toEqual(111)
  expect(statsWithByteTotal.countConsumers).toEqual(222)
  expect(statsWithByteTotal.sumBytesReceived).toEqual(333)
  expect(statsWithByteTotal.sumBytesSent).toEqual(444)
  expect(statsWithByteTotal.sumDuration).toEqual(555)
  expect(statsWithByteTotal.sumTokens).toEqual(666)
  expect(statsWithByteTotal.byteTotal).toEqual(777)
})
