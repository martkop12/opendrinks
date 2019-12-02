import { createLocalVue, mount } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';

import router from '@/router';
import Explore from '@/views/Explore.vue';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe('Explore', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Explore, {
      localVue,
      router,
    });
  });

  test('toggle filters when button is clicked', () => {
    expect(wrapper.findAll('.col-12 h4').exists()).toBe(false);
    wrapper.find('.btn-outline-secondary').trigger('click');
    expect(wrapper.find('.col-12 h4').text()).toBe('Filters');
  });

  test('displays filter keywords', () => {
    wrapper.find('.btn-outline-secondary').trigger('click');
    wrapper.vm.addNewKeywordToFilter('alcoholic');
    wrapper.vm.addNewKeywordToFilter('gin');
    expect(
      wrapper
        .findAll('.filter-item')
        .at(1)
        .text(),
    ).toBe('gin');
  });

  test('removes a filter when clicked', () => {
    wrapper.find('.btn-outline-secondary').trigger('click');
    wrapper.vm.addNewKeywordToFilter('alcoholic');
    wrapper.vm.addNewKeywordToFilter('gin');
    wrapper
      .findAll('.filter-item')
      .at(1)
      .trigger('click');
    expect(wrapper.findAll('.filter-item').length).toBe(1);
  });

  test('removes all filters when clicked reset filters button', () => {
    wrapper.find('.btn-outline-secondary').trigger('click');
    wrapper.vm.addNewKeywordToFilter('alcoholic');
    wrapper.vm.addNewKeywordToFilter('gin');
    wrapper.vm.addNewKeywordToFilter('vodka');
    wrapper.vm.addNewKeywordToFilter('rum');
    wrapper.vm.resetFilters();
    expect(wrapper.findAll('.filter-item').length).toBe(0);
  });

  test('test adding same keyword to filter', () => {
    wrapper.find('.btn-outline-secondary').trigger('click');
    wrapper.vm.addNewKeywordToFilter('alcoholic');
    wrapper.vm.addNewKeywordToFilter('alcoholic');
    expect(wrapper.findAll('.filter-item').length).toBe(1);
  });

});
