import React from 'react'

import images from '@styles/images'

import { statusImage, format } from './internals'

describe('statusImage()', () => {
  it('returns tick icon for winning', () => {
    const image = statusImage({ won: true, })

    expect(image).toEqual(images.tick)
  })

  it('returns star icon winning in leaderboard', () => {
    const image = statusImage({ type: 'leaderboard', rank: 1, })

    expect(image).toEqual(images.star)
  })
})

describe('format()', () => {
  it('returns formatted position', () => {
    const position = format(6237)

    expect(position).toEqual('6,237')
  })
})
