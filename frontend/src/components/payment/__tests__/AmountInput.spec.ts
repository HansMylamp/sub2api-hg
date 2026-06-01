import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AmountInput from '../AmountInput.vue'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}))

describe('AmountInput', () => {
  it('uses KRW quick amounts by default', () => {
    const wrapper = mount(AmountInput, {
      props: {
        modelValue: null,
      },
    })

    expect(wrapper.findAll('button').map((button) => button.text())).toEqual([
      '1,200원',
      '5,400원',
      '11,000원',
      '22,000원',
      '55,000원',
      '82,400원',
    ])
    expect(wrapper.text()).toContain('₩')
  })

  it('emits integer custom KRW amounts', async () => {
    const wrapper = mount(AmountInput, {
      props: {
        modelValue: null,
      },
    })

    await wrapper.find('input').setValue('1200')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([1200])
  })
})
