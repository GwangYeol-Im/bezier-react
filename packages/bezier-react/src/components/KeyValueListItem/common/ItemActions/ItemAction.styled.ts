import {
  css,
  styled,
} from '~/src/foundation'

import { type AdditionalColorProps } from '~/src/types/ComponentProps'
import { isNil } from '~/src/utils/typeUtils'

import { Icon } from '~/src/components/Icon'

export const ItemActionWrapper = styled.div`
  display: flex;
  align-items: center;
`
interface ActionWrapperProps extends AdditionalColorProps<['hoverBackground', 'hoverIcon']> {
  show: boolean
}

export const ActionIcon = styled(Icon)``

export const ActionIconWrapper = styled.button<ActionWrapperProps>`
  all: unset;

  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  padding: 2px;
  margin-left: auto;
  cursor: pointer;

  ${({ foundation }) => foundation?.rounding?.round6}

  &:hover,
  &:focus-visible {
    ${({ foundation, hoverBackgroundColor }) => !isNil(hoverBackgroundColor) && css`
      background-color: ${foundation?.theme?.[hoverBackgroundColor]};
    `}

    ${ActionIcon} {
      ${({ foundation, hoverIconColor }) => !isNil(hoverIconColor) && css`
        color: ${foundation?.theme?.[hoverIconColor]};
      `}
    }
  }
`
