import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import defaultExport, {
  meatGenerator,
  cheeseGenerator,
  sauceGenerator,
} from './helpers'
import SandwichMaker from './SandwichMaker'

// Considered mocking "partials"
// https://jestjs.io/docs/mock-functions#mocking-partials
jest.mock('./helpers', () => {
  const originalModule = jest.requireActual('./helpers')
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked food'),
    meatGenerator: jest.fn(() => 'ham'),
    cheeseGenerator: jest.fn(() => 'cheddar'),
    sauceGenerator: jest.fn(() => 'mayo'),
  }
})

test('creates a ham and cheddar sandwich with mayo', async () => {
  const defaultExportResult = defaultExport()
  expect(defaultExportResult).toBe('mocked food')
  expect(defaultExport).toHaveBeenCalled()

  expect(meatGenerator()).toBe('ham')
  expect(cheeseGenerator()).toBe('cheddar')
  expect(sauceGenerator()).toBe('mayo')

  render(<SandwichMaker sauce="mayo" />)

  screen.getByText('A ham and cheddar sandwich, topped with mayo')
})
