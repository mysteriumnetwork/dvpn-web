/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { forwardRef, useMemo } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ReactComponent as TriangleDown } from '../../../assets/images/triangle-down.svg'

const PickerOverrides = styled.div`
  .react-datepicker__current-month {
    color: ${({ theme }) => theme.calendar.textColor};
  }
  .react-datepicker__header {
    background-color: ${({ theme }) => theme.calendar.bgHeader};
    padding: 10px 5px 20px 5px;
    border: none;
    color: ${({ theme }) => theme.calendar.textColor}!important;
  }
  .react-datepicker {
    border: none;
    border-radius: 10px;
    box-shadow: 0px 5px 40px rgba(0, 0, 69, 0.1);
    background-color: ${({ theme }) => theme.calendar.bgBody};
    color: ${({ theme }) => theme.calendar.textColor};
    padding: 10px;
  }
  .react-datepicker__triangle {
    background-color: ${({ theme }) => theme.calendar.bgBody};
    border-color: ${({ theme }) => theme.calendar.bgBody};
    ::after {
      border-bottom-color: ${({ theme }) => theme.calendar.bgBody}!important;
      left: 66px !important;
      top: 1px !important;
    }
    ::before {
      border-bottom-color: ${({ theme }) => theme.calendar.bgBody}!important;
      left: 66px !important;
      top: 1px !important;
    }
  }
  .react-datepicker__navigation {
    margin: 13px 5px;
  }
  .react-datepicker__navigation-icon {
    :before {
      border-color: ${({ theme }) => theme.calendar.textColor};
      height: 4px;
      width: 4px;
    }
  }
  .react-datepicker__day {
    cursor: pointer;
    color: ${({ theme }) => theme.calendar.textColor};

    &:hover {
      border-radius: 50% !important;
      background-color: ${({ theme }) => theme.common.colorKeyLight};
    }
    &-names {
      display: none;
    }
    &--today {
      font-weight: bold;
    }

    &--highlighted {
      border-radius: 50%;
      background-color: ${({ theme }) => theme.common.colorKey};
      color: ${({ theme }) => theme.common.colorWhite};

      &:hover {
        background-color: ${({ theme }) => theme.common.colorKey};
      }
    }

    &--selected,
    &--in-range {
      border-radius: 50%;
      background-color: ${({ theme }) => theme.common.colorKey};
      color: ${({ theme }) => theme.common.colorWhite};
      &:hover {
      }
    }

    &--in-selecting-range:not(.--in-range) {
      background-color: ${({ theme }) => theme.common.colorKeyLight};
      color: ${({ theme }) => theme.common.colorWhite};
      border-radius: 50%;
    }

    &--in-range:not(.react-datepicker__day--in-selecting-range) {
      background-color: ${({ theme }) => theme.common.colorKey};
    }
    &--keyboard-selected {
      border-radius: 50%;
      background-color: ${({ theme }) => theme.common.colorKey};
      color: #fff;
      &:hover {
        background-color: ${({ theme }) => theme.common.colorKey};
      }
    }
    &--disabled {
      cursor: default;
      &:hover {
        background-color: transparent;
      }
    }
    /* TODO: These do not work for some unknown reason, needs investigation */
    &--selecting-range-start {
      background-color: ${({ theme }) => theme.common.colorKey};
      border-radius: 20px;
    }

    &--selecting-range-end {
      background-color: ${({ theme }) => theme.common.colorKey};
      border-radius: 20px;
    }
  }
`
const CustomPickerInput = styled.button`
  color: ${({ theme }) => theme.calendar.inputColor};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  border: none;
  background: none;
  :hover {
    cursor: pointer;
  }
`
interface IconProps {
  $clicked: boolean
}
const InputIcon = styled(TriangleDown)<IconProps>`
  border-color: ${({ theme }) => theme.calendar.inputColor};
  margin-left: 10px;
  margin-bottom: 1px;
  transform: ${({ $clicked }) => ($clicked ? 'rotate(180deg)' : '')};
`
interface Props {
  onClick: () => void
  onChange: (dates: any) => void
  startDate: Date | null
  endDate: Date | null
  open: boolean
}

export const CustomDatePicker = ({ onClick, onChange, startDate, endDate, open }: Props) => {
  const now = useMemo(() => {
    return new Date().toISOString().split('T')[0]
  }, [])
  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
    return (
      <CustomPickerInput onClick={onClick} ref={ref}>
        {value ? value : `Begginning - ${now}`}
        <InputIcon $clicked={open} />
      </CustomPickerInput>
    )
  })
  return (
    <PickerOverrides>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        dateFormat={'yyyy-MM-dd'}
        // TODO: Arrow gets bugged when date is selected, investigate more later
        onInputClick={onClick}
        onClickOutside={onClick}
        customInput={<CustomInput value={startDate} />}
      />
    </PickerOverrides>
  )
}
