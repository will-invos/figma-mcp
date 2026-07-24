import type { ReactNode } from 'react'
import type { StoryDef } from './types'
import MainTabTemplate from '../templates/MainTabTemplate'
import ListTemplate from '../templates/ListTemplate'
import FormTemplate from '../templates/FormTemplate'
import DetailTemplate from '../templates/DetailTemplate'
import '../templates/templates.css'

/** 把整頁範本框成手機尺寸，方便在 storybook canvas 內預覽 */
function Frame({ children }: { children: ReactNode }) {
  return <div className="tpl-preview-frame">{children}</div>
}

export const MainTabTemplateStory: StoryDef = {
  component: MainTabTemplate,
  name: '主頁',
  category: '頁面範本',
  props: {},
  hideCode: true,
  Render: () => <Frame><MainTabTemplate /></Frame>,
}

export const ListTemplateStory: StoryDef = {
  component: ListTemplate,
  name: '列表頁',
  category: '頁面範本',
  props: {},
  hideCode: true,
  Render: () => <Frame><ListTemplate /></Frame>,
}

export const FormTemplateStory: StoryDef = {
  component: FormTemplate,
  name: '表單頁',
  category: '頁面範本',
  props: {},
  hideCode: true,
  Render: () => <Frame><FormTemplate /></Frame>,
}

export const DetailTemplateStory: StoryDef = {
  component: DetailTemplate,
  name: '詳情頁',
  category: '頁面範本',
  props: {},
  hideCode: true,
  Render: () => <Frame><DetailTemplate /></Frame>,
}
