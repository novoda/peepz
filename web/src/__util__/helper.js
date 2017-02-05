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
        return wrapper.exists();
      },
      elementExists: style => {
        return find(wrapper)(style).exists();
      },
      elementText: style => {
        return find(wrapper)(style).text();
      },
      clickElement: style => {
        find(wrapper)(style).simulate('click');
      }
    };
  }
};

const find = view => style => {
  return view.find(`.${css(style)}`);
};

global.Helper = helper;
