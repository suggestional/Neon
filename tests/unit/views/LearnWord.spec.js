import { mount } from '@vue/test-utils'
import LearnWord from '@/views/LearnWord.vue'


describe('LearnWord.vue Test', () => {
    const wrapper = mount(LearnWord, {
    propsData: {
        title: 'LearnWord.vue'
    }
})

    it('initializes with correct elements', () => {

        // check that the ion component text is rendered
        expect(wrapper.findAll('ion-toolbar').at(0).text()).toMatch('今日学习')
        expect(wrapper.findAll('ion-item').at(0).text()).toMatch('某某单词xxx')

        expect(wrapper.findAll('ion-card-subtitle').at(0).text()).toMatch('xx')
        expect(wrapper.findAll('ion-card-title').at(0).text()).toMatch('xxx')
        expect(wrapper.findAll('ion-card-content').at(0).text()).toMatch('显示单词详细信息 例句等等')

        expect(wrapper.findAll('ion-button').at(0).text()).toMatch('下一个')
             expect(wrapper.findAll('ion-button').at(1).text()).toMatch('上一个')

    })

    it('test button click events', () => {

        //to be completed

        // wrapper.findAll('ion-button').at(0).trigger('click')

        // expect(wrapper.emitted('LearnWord')).toBeTruthy()

    })

})
