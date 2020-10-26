/* External dependencies */
import React, { Ref, forwardRef, useState, useEffect, useMemo, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { noop, isNumber, get, map, identity } from 'lodash-es'

/* Internal dependencies */
import { isTabItem } from '../TabItem'
import { isTabActions } from '../TabActions'
import TabsProps from './Tabs.types'
import { Wrapper, TabItemWrapper } from './Tabs.styled'

export const TABS_TEST_ID = 'ch-design-system-tabs'

function Tabs({
  as,
  testId = TABS_TEST_ID,
  disabled = false,
  optionsWrapperClassName,
  withIndicator,
  indicatorThickness,
  /* OptionItemHost props */
  selectedOptionIndex = 0,
  onChangeOption = noop,
  /* HTMLAttribute props */
  children,
  ...otherProps
}: TabsProps, forwardedRef: Ref<any>) {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(selectedOptionIndex)

  useEffect(() => {
    if (isNumber(selectedOptionIndex)) {
      setCurrentTabIndex(selectedOptionIndex)
    }
  }, [selectedOptionIndex])

  const handleClickTab = useCallback((
    tabIndex: number,
    optionKey: string,
    allowActive: boolean = true,
  ) => {
    if (allowActive) { setCurrentTabIndex(tabIndex) }
    onChangeOption(optionKey, tabIndex)
  }, [onChangeOption])

  const Content = useMemo(() => (
    React.Children.map(children, (element, index: number) => {
      if (isTabItem(element)) {
        return React.cloneElement(element, {
          active: get(element.props, 'allowActive', true) && (currentTabIndex === index),
          disabled,
          withIndicator,
          indicatorThickness,
          onClick: (event: React.MouseEvent<HTMLDivElement>) => {
            handleClickTab(index, element.props.optionKey, get(element.props, 'allowActive', true))
            if (element.props.onClick) { element.props.onClick(event) }
          },
        })
      }
      if (isTabActions(element)) { return null }
      return element
    })
  ), [
    disabled,
    withIndicator,
    indicatorThickness,
    children,
    currentTabIndex,
    handleClickTab,
  ])

  const Actions = useMemo(() => (
    map(children, (child) => {
      if (isTabActions(child)) {
        return React.cloneElement(child, { key: child.key || uuid(), disabled })
      }
      return null
    }).filter(identity)
  ), [disabled, children])

  return (
    <Wrapper
      ref={forwardedRef}
      disabled={disabled}
      data-testid={testId}
      data-disabled={disabled}
      data-active-index={currentTabIndex}
      {...otherProps}
    >
      <TabItemWrapper className={optionsWrapperClassName}>
        { Content }
      </TabItemWrapper>

      { Actions }
    </Wrapper>
  )
}

export default forwardRef(Tabs)
