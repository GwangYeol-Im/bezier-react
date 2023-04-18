import React from 'react'

import { Typography } from '~/src/foundation'

import { render } from '~/src/utils/testUtils'

import Text, { TEXT_TEST_ID } from './Text'
import type TextProps from './Text.types'

describe('Text test >', () => {
  let props: TextProps

  beforeEach(() => {
    props = {
      children: 'hello, world',
    }
  })

  const renderComponent = (optionProps?: TextProps) => render(<Text {...props} {...optionProps} />)

  it('Text have default style', () => {
    const { getByTestId } = renderComponent()

    const renderedText = getByTestId(TEXT_TEST_ID)

    expect(renderedText).toHaveStyle('font-size: 1.5rem;')
    expect(renderedText).toHaveStyle('font-weight: normal;')
    expect(renderedText).toHaveStyle('font-style: normal;')
    expect(renderedText).toHaveStyle('color: inherit;')
  })

  it('Text receives bold style', () => {
    const { getByTestId } = renderComponent({ bold: true })

    const renderedText = getByTestId(TEXT_TEST_ID)

    expect(renderedText).toHaveStyle('font-weight: bold;')
  })

  it('Text receives italic style', () => {
    const { getByTestId } = renderComponent({ italic: true })

    const renderedText = getByTestId(TEXT_TEST_ID)

    expect(renderedText).toHaveStyle('font-style: italic;')
  })

  it('Text receives truncated style', () => {
    const { getByTestId } = renderComponent({ truncated: true })

    const renderedText = getByTestId(TEXT_TEST_ID)

    expect(renderedText).toHaveStyle('display: block;')
    expect(renderedText).toHaveStyle('overflow: hidden;')
    expect(renderedText).toHaveStyle('text-overflow: ellipsis;')
    expect(renderedText).toHaveStyle('white-space: nowrap;')
  })

  it('Text receives style object', () => {
    const { getByTestId } = renderComponent({ style: { color: 'skyblue' } })

    const renderedText = getByTestId(TEXT_TEST_ID)

    expect(renderedText).toHaveStyle('color: skyblue;')
  })

  it('Text receives typo from styled component css', () => {
    const { getByTestId } = renderComponent({ typo: Typography.Size24 })

    const renderedText = getByTestId(TEXT_TEST_ID)

    expect(renderedText).toHaveStyle('font-size: 2.4rem;')
    expect(renderedText).toHaveStyle('line-height: 3.2rem;')
  })
})
