<template>
  <div>
    <h4>В разработке</h4>

    <!--Навигационное меню-->
    <div class="d-flex align-items-center justify-content-center py-2">
      <div
        class="btn btn-default mr-1"
        title="Увеличить"
        @click="zoomIn"
      >
        <font-awesome-icon icon="plus" />
      </div>
      <div
        class="btn btn-default mr-3"
        title="Уменьшить"
        @click="zoomOut"
      >
        <font-awesome-icon icon="minus" />
      </div>
      <div
        v-for="(radio, radioIndex) in radioList"
        :key="radioIndex"
        class="btn btn-default"
        :class="[{ 'mr-1' : radioIndex < radioList.length - 1 }, { 'active': selectedRadio === radio.name }]"
        @click="onSelectRadio(radio.name)"
      >
        {{ radio.label }}
      </div>
    </div>
    <div
      ref="gantt"
      :style="`height: ${height}px;`"
    />
  </div>
</template>

<script>
import { gantt } from 'dhtmlx-gantt'
import { formatDate, shortUserName } from '@/assets/js/helpers'
import 'dhtmlx-gantt/codebase/locale/locale_ru'
import { dom } from '@fortawesome/fontawesome-svg-core'
import { endOfWeek } from 'date-fns'

dom.watch()

export default {
  name: 'Gantt',
  props: {
    ganttData: {
      type: Object,
      default () {
        return { data: [], links: [] }
      }
    },
    height: {
      type: [ String, Number ],
      default: 500
    }
  },
  data () {
    return {
      radioList: [
        {
          name: 'day',
          label: 'День',
          scale_height: 27,
          min_column_width: 80,
          scales: [
            { unit: 'day', step: 1, format: '%d %M' }
          ]
        },
        {
          name: 'week',
          label: 'Неделя',
          scale_height: 50,
          min_column_width: 50,
          scales: [
            {
              unit: 'week',
              step: 1,
              format: (date) => {
                const dateToStr = gantt.date.date_to_str('%d %M')
                const weekEnd = endOfWeek(date, { weekStartsOn: 1 })

                return dateToStr(date) + ' - ' + dateToStr(weekEnd)
              }
            },
            { unit: 'day', step: 1, format: '%j %D' }
          ]
        },
        {
          name: 'month',
          label: 'Месяц',
          scale_height: 50,
          min_column_width: 120,
          scales: [
            { unit: 'month', format: '%F, %Y г.' },
            { unit: 'week', format: 'Неделя #%W' }
          ]
        },
        {
          name: 'quarter',
          label: 'Квартал',
          height: 50,
          min_column_width: 90,
          scales: [
            { unit: 'month', step: 1, format: '%M' },
            {
              unit: 'quarter',
              step: 1,
              format: (date) => {
                const yearToStr = gantt.date.date_to_str('%Y')
                const dateToStr = gantt.date.date_to_str('%M')
                const endDate = gantt.date.add(gantt.date.add(date, 3, 'month'), -1, 'day')

                return dateToStr(date) + ' - ' + dateToStr(endDate) + ' ' + yearToStr(date) + ' г.'
              }
            }
          ]
        },
        {
          name: 'year',
          label: 'Год',
          scale_height: 50,
          min_column_width: 30,
          scales: [
            { unit: 'year', step: 1, format: '%Y г.' }
          ]
        }
      ],
      selectedRadio: 'day'
    }
  },
  watch: {
    tasks: {
      handler () {
        gantt.parse(this.tasks)
      },
      deep: true
    }
  },
  mounted () {
    this.setConfig()
    this.setTemplates()
    this.setEvents()

    gantt.init(this.$refs.gantt)
    gantt.parse(this.tasks)
  },
  methods: {
    onSelectRadio (name) {
      this.selectedRadio = name
      gantt.ext.zoom.setLevel(name)
    },
    setConfig () {
      /*
      * Документация
      * https://docs.dhtmlx.com/gantt/api__refs__gantt_props.html
      * */
      gantt.config.columns = [
        {
          name: 'name',
          label: 'Название задачи',
          tree: true,
          width: '250',
          template: (obj) => `<div class="text-truncate" style="max-width: 200px;">${obj.name}</div>`
        },
        {
          name: 'assigned',
          label: 'Исполнитель',
          width: '150',
          template: (obj) => {
            if (!(obj.hasOwnProperty('assigned') && obj.assigned.hasOwnProperty('userimage') && obj.assigned.hasOwnProperty('username'))) return

            const avatar = obj.assigned.userimage
              ? `<span style="background-image: url(https://nd-api.gio.ru/${obj.assigned.userimage})"></span>`
              : `<i class='fa fa-user-circle fa-2x text-gray mx-1'></i>`
            const showAvatar = obj.assigned.username
              ? `<span class="avatar avatar--small avatar--round">${avatar}</span>`
              : ''

            return `
              <div class="d-flex align-items-center">
                ${showAvatar}
                <span class="ml-2">${shortUserName(obj.assigned.username) || ''}</span>
              </div>`
          }
        }
        // { name: 'add', label: '' }
      ]

      /*
      * gantt zoom + radio кнопки
      * Пример: https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html
      * */
      gantt.ext.zoom.init({ levels: this.radioList })
      gantt.ext.zoom.setLevel(this.selectedRadio)
      gantt.ext.zoom.attachEvent('onAfterZoom', (level, config) => {
        this.selectedRadio = config.name
      })
    },
    setTemplates () {
      /*
      * Документация:
      * https://docs.dhtmlx.com/gantt/api__refs__gantt_templates.html
      * */
      // gantt.templates.task_text = (start, end, task) => `<b>${task.name}.</b>` + (task.users ? `, Исполнитель: ${task.users}` : '')
      gantt.templates.task_text = (start, end, task) => task.name
      /*
      * BG самого прогресса
      * */
      gantt.templates.task_class = () => 'bg-primary text-truncate'
      gantt.templates.scale_cell_class = (date) => {
        if (date.getDay() === 0 || date.getDay() === 6) {
          return 'weekend'
        }
      }
      gantt.templates.timeline_cell_class = (item, date) => {
        if (date.getDay() === 0 || date.getDay() === 6) {
          return 'weekend'
        }
      }

      /*
      * Форматируем дату колонки Начало
      * */
      gantt.templates.grid_date_format = (date) => formatDate(date, 'dd.MM.yyyy')
      gantt.templates.grid_open = (item) => {
        const icon = item.$open ? 'fa-minus' : 'fa-plus'
        const status = item.$open ? 'gantt_close' : 'gantt_open'
        return `
          <i class="gantt_tree_icon ${status}">
           <i class='fa ${icon} text-gray mx-1'></i>
          </i>`
      }
      /*
      * Меняем иконки со стандартных на FontAwesome
      * */
      gantt.templates.grid_file = (item) => {
        return `
          <div class="gantt_tree_icon text-center">
           <div class='fas fa-file-alt fa-lg text-primary mx-1'></div>
          </div>`
      }
      gantt.templates.grid_folder = (item) => {
        return `
          <div class="gantt_tree_icon text-center">
           <div class='${item.$open ? 'fa fa-folder-open' : 'fa fa-folder'} fa-lg text-warning mx-1'></div>
          </div>`
      }

      gantt.templates.progress_text = (start, end, task) => ''
      // gantt.templates.progress_text = (start, end, task) => `${(task.progress * 100).toFixed()}%`
    },
    setEvents () {
      /*
      * Документация
      * https://docs.dhtmlx.com/gantt/api__refs__gantt_events.html
      * */
      if (gantt.$_eventsInitialized) return

      gantt.attachEvent('onTaskSelected', (id) => {
        let task = gantt.getTask(id)
        this.$emit('task-selected', task)
      })
      gantt.attachEvent('onAfterTaskAdd', (id, task) => {
        this.$emit('task-updated', id, 'inserted', task)
        task.progress = task.progress || 0
        if (gantt.getSelectedId() === id) {
          this.$emit('task-selected', task)
        }
      })
      gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
        this.$emit('task-updated', id, 'updated', task)
        gantt.render()
      })
      gantt.attachEvent('onAfterTaskDelete', (id) => {
        this.$emit('task-updated', id, 'deleted')
        if (!gantt.getSelectedId()) {
          this.$emit('task-selected', null)
        }
      })
      gantt.attachEvent('onAfterLinkAdd', (id, link) => {
        this.$emit('link-updated', id, 'inserted', link)
      })
      gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
        this.$emit('link-updated', id, 'updated', link)
      })
      gantt.attachEvent('onAfterLinkDelete', (id, link) => {
        this.$emit('link-updated', id, 'deleted')
      })
      gantt.$_eventsInitialized = true
    },
    zoomIn () {
      gantt.ext.zoom.zoomIn()
    },
    zoomOut () {
      gantt.ext.zoom.zoomOut()
    }
  }
}
</script>

<style lang="scss">
  @import '~dhtmlx-gantt/codebase/dhtmlxgantt.css';

  .gantt_tree_icon.gantt_close,
  .gantt_tree_icon.gantt_open {
    background: rgba(2, 2, 2, 0.01);
  }

  /* .weekend { */

  /*  background: #f4f7f4; */

  /* } */

  .gantt_task_progress {
    padding-left: 10px;
    font-weight: bold;
    text-align: left;
    color: white;
  }

  .gantt_task_content {
    /* padding-left: 40px; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .gantt_scale_cell.weekend,
  .gantt_task_cell.weekend {
    background: #f4f7f4;
  }

  .bg-primary .gantt_task_progress {
    background: darken($blue, 10);
  }

</style>
