import { meatGenerator, cheeseGenerator, sauceGenerator } from './helpers'

const SandwichMaker = ({ fancy }) =>
  `A ${meatGenerator(fancy)} and ${cheeseGenerator(fancy)} 
  sandwich, topped with ${sauceGenerator(fancy)}`

export default SandwichMaker
