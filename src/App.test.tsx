
// import { render } from '@testing-library/react';
import { shallow, mount, render } from 'enzyme';
import App from './App';

describe('renders <App />', () => {
  it('should pass shallow snapshot test', () => {
    const wrapper = render(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});