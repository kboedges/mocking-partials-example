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

describe('fully mocked', () => {
  test('creates a ham and cheddar sandwich with mayo', () => {
    // Note how we don't pass in the boolean, fancy, here
    const defaultExportResult = defaultExport()
    expect(defaultExportResult).toBe('mocked food')
    expect(defaultExport).toHaveBeenCalled()

    expect(meatGenerator()).toBe('ham')
    expect(cheeseGenerator()).toBe('cheddar')
    expect(sauceGenerator()).toBe('mayo')

    render(<SandwichMaker />)

    screen.getByText('A ham and cheddar sandwich, topped with mayo')
  })
})

// describe('fancy sandwich', () => {
//   test('creates a turkey and provolone sandwich with horseradish', () => {
//     render(<SandwichMaker fancy={true} />)

//     screen.getByText('A turkey and provolone sandwich, topped with horseradish')
//   })
// })

// describe('plain sandwich', () => {
//   test('creates a ham and cheddar sandwich with mayo', () => {
//     render(<SandwichMaker fancy={false} />)

//     screen.getByText('A ham and cheddar sandwich, topped with mayo')
//   })
// })
