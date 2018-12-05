import * as React from 'react'
import * as Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'

import Portfolio from './index'

configure({ adapter: new Adapter() })

describe('portfolio', () => {
  it('should match the snapshot', () => {
    const headerlink = shallow(<Portfolio />)
    expect(headerlink).toMatchSnapshot()
  })
})