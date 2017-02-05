/*global global*/
import { StyleSheetTestUtils, css } from 'aphrodite/no-important';
import { shallow } from 'enzyme';

const helper = {
  suppressStyleInjection: () => {
    StyleSheetTestUtils.suppressStyleInjection();
  },
  resumeStyleInjection: () => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  },
  of: view => {
    const wrapper = shallow(view);
    return {
      rootExists: () => {
        return wrapper.type() !== null && wrapper.exists();
      },
      style: style => {
        return sugar(find(wrapper)(style));
      },
      component: component => {
        return sugar(wrapper.find(component));
      }
    };
  }
};

const find = view => style => {
  return view.find(`.${css(style)}`);
};

const sugar = element => {
  return {
    exists: () => {
      return element.exists();
    },
    click: () => {
      element.simulate('click');
    },
    text: () => {
      return element.text();
    }
  };
};

global.Helper = helper;
