/* eslint-env mocha */
'use strict'

const expect = require('chai').expect

const utils = require('../src/utils')

describe('utils', () => {
  it('randomSeqno', () => {
    const first = utils.randomSeqno()
    const second = utils.randomSeqno()

    expect(first).to.have.length(40)
    expect(second).to.have.length(40)
    expect(first).to.not.eql(second)
  })

  it('msgId', () => {
    expect(utils.msgId('hello', 'world')).to.be.eql('helloworld')
  })

  it('anyMatch', () => {
    [
      [[1, 2, 3], [4, 5, 6], false],
      [[1, 2], [1, 2], true],
      [[1, 2, 3], [4, 5, 1], true],
      [[5, 6, 1], [1, 2, 3], true],
      [[], [], false],
      [[1], [2], false]
    ].forEach((test) => {
      expect(utils.anyMatch(new Set(test[0]), new Set(test[1])))
        .to.eql(test[2])

      expect(utils.anyMatch(new Set(test[0]), test[1]))
        .to.eql(test[2])
    })
  })

  it('ensureArray', () => {
    expect(utils.ensureArray('hello')).to.be.eql(['hello'])
    expect(utils.ensureArray([1, 2])).to.be.eql([1, 2])
  })

  it('converts an IN msg.from to b58', () => {
    let binaryId = Buffer.from('1220e2187eb3e6c4fb3e7ff9ad4658610624a6315e0240fc6f37130eedb661e939cc', 'hex')
    let stringId = 'QmdZEWgtaWAxBh93fELFT298La1rsZfhiC2pqwMVwy3jZM'
    const m = [
      { from: binaryId },
      { from: stringId }
    ]
    const expected = [
      { from: stringId },
      { from: stringId }
    ]
    expect(utils.normalizeInRpcMessages(m)).to.deep.eql(expected)
  })

  it('converts an OUT msg.from to binary', () => {
    let binaryId = Buffer.from('1220e2187eb3e6c4fb3e7ff9ad4658610624a6315e0240fc6f37130eedb661e939cc', 'hex')
    let stringId = 'QmdZEWgtaWAxBh93fELFT298La1rsZfhiC2pqwMVwy3jZM'
    const m = [
      { from: binaryId },
      { from: stringId }
    ]
    const expected = [
      { from: binaryId },
      { from: binaryId }
    ]
    expect(utils.normalizeOutRpcMessages(m)).to.deep.eql(expected)
  })
})
