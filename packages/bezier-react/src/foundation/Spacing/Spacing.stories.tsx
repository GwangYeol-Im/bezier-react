import React from 'react'

import {
  type Meta,
  type Story,
} from '@storybook/react'
import base from 'paths.macro'

import {
  Spacing,
  styled,
} from '~/src/foundation'

import { type Entries } from '~/src/types/Utils'
import { getTitle } from '~/src/utils/storyUtils'

import { Text } from '~/src/components/Text'

export default {
  title: getTitle(base),
} as Meta

interface SpacingRectProps {
  spacing: keyof typeof Spacing
}

const Wrapper = styled.div`
  > * + * {
    padding-top: 6px;
    margin-top: 6px;
    ${({ foundation }) => foundation?.border.getBorder(
    1,
    foundation?.theme?.['bdr-black-light'],
    {
      top: true, right: false, bottom: false, left: false,
    })}
  }
`

const Cell = styled.div`
  width: 100px;
`

const Row = styled.div`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 20px;
  }
`

const SpacingRect = styled.div<SpacingRectProps>`
  width: ${({ foundation, spacing }) => foundation?.spacing?.[spacing]};
  height: 8px;
  background-color: ${({ foundation }) => foundation?.theme?.['bgtxt-blue-normal']};
`

const Template: Story<SpacingRectProps> = () => (
  <Wrapper>
    <Row key="head">
      <Cell>
        <Text bold>Name</Text>
      </Cell>
      <Cell>
        <Text bold>Space</Text>
      </Cell>
      <Cell>
        <Text bold>Pixels</Text>
      </Cell>
    </Row>
    { (Object.entries(Spacing) as Entries<typeof Spacing>).map(([key, value]) => (
      <Row key={key}>
        <Cell>
          <Text>{ key }</Text>
        </Cell>
        <Cell>
          <Text>{ value }</Text>
        </Cell>
        <Cell>
          <SpacingRect spacing={key} />
        </Cell>
      </Row>
    )) }
  </Wrapper>
)

export const Primary = Template.bind({})
