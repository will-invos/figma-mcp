import type { ReactNode } from 'react'
import type { StoryDef } from './types'
import MainTabTemplate from '../templates/MainTabTemplate'
import ListTemplate from '../templates/ListTemplate'
import SettingsTemplate from '../templates/SettingsTemplate'
import FormTemplate from '../templates/FormTemplate'
import DetailTemplate from '../templates/DetailTemplate'
import NotFoundTemplate from '../templates/NotFoundTemplate'
import '../templates/templates.css'
import './Templates.story.css'

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

export const SettingsTemplateStory: StoryDef = {
  component: SettingsTemplate,
  name: '設定頁',
  category: '頁面範本',
  props: {},
  hideCode: true,
  Render: () => <Frame><SettingsTemplate /></Frame>,
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

export const NotFoundTemplateStory: StoryDef = {
  component: NotFoundTemplate,
  name: '404 頁',
  category: '頁面範本',
  props: {},
  hideCode: true,
  Render: () => <Frame><NotFoundTemplate /></Frame>,
}
