import { QualityCalculator, QualityLevel } from 'mysterium-vpn-js'

export const qualityCalculator = new QualityCalculator()

export const isHigh = (value: QualityLevel) => value === QualityLevel.HIGH

export const isMedium = (value: QualityLevel) => value === QualityLevel.MEDIUM

export const isLow = (value: QualityLevel) => value === QualityLevel.LOW

export const isUnknown = (value: QualityLevel) => value === QualityLevel.UNKNOWN
