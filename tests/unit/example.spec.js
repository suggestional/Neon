import { mount } from '@vue/test-utils'
import Tab1Page from '@/views/LearnPage.vue'

//import Tab1Page from '../../src/views/LearnPage.vue'




describe('Tab1Page.vue', () => {
  it('renders tab 1 Tab1Page', () => {
    const wrapper = mount(Tab1Page)
    expect(wrapper.text()).toMatch('学习切换词书开始学习开始复习')
  })
})
