<style lang="scss" scoped>
.t-datetime-picker {
  .v-tabs-slider-wrapper {
    top: 0;
  }
  .v-picker__title {
    height: 90px;
  }
  .v-time-picker-title__time * {
    font-size: 60px;
    height: 60px;
  }
  .v-picker__body {
    height: 290px;
  }
  .v-tabs-items {
    height: 380px;
  }
}
</style>

<template>
  <v-dialog
    @click:outside="closeDialog"
    v-model="datetimeDialog"
    :persistent="persistent"
    width="290px"
    :fullscreen="fullscreen"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="datetimeFormatted"
        readonly
        v-bind="{ ...attrs, ...$attrs }"
        v-on="on"
        prepend-icon="date_range"
        :disabled="disabled"
        :clearable="true"
        @click:clear="clearHandler"
        :rules="rules"
      ></v-text-field>
    </template>

    <v-card class="t-datetime-picker white">
      <v-toolbar height="36" color="primary" dark flat>
        <v-tabs v-model="tab" grow height="36">
          <v-tabs-slider color="white"></v-tabs-slider>
          <v-tab href="#date">
            <v-icon>mdi-calendar</v-icon>
          </v-tab>
          <v-tab href="#time">
            <v-icon>mdi-clock</v-icon>
          </v-tab>
          <v-btn depressed text class="rounded-0" @click="closeDialog">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-tabs>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item value="date">
          <v-date-picker
            v-model="date"
            class="rounded-0"
            @input="tab = 'time'"
            full-width
            :min="dateMin"
          >
          </v-date-picker>
        </v-tab-item>
        <v-tab-item value="time">
          <v-time-picker
            :key="tab"
            v-model="time"
            format="24hr"
            class="rounded-0"
            full-width
            @click:minute="closeDialog"
            :min="timeMin"
          >
          </v-time-picker>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'

export default {
  inheritAttrs: false,
  props: [
    'value',
    'fullscreen',
    'persistent',
    'dateFormat',
    'timeFormat',
    'disabled',
    'dateMin',
    'timeMin',
    'clearClicked',
    'rules',
  ],
  data() {
    return {
      date: '',
      time: '',
      tab: false,
      datetimeDialog: false,
    }
  },
  computed: {
    datetimeFormatted() {
      return this.value
    },
  },
  watch: {
    datetimeDialog: function (val) {
      // load into separated models as dialog opens
      if (val && this.value != '') {
        let date = moment(this.value).format('YYYY-MM-DD')
        this.date = date

        let time = moment(this.value).format('HH:mm:ss')
        this.time = time
      }
    },
  },
  methods: {
    clearHandler(e) {
      this.$emit('clearClicked')
    },
    rulesHandler(e) {
      this.$emit('rules')
    },
    closeDialog() {
      this.datetimeDialog = false

      this.$emit('input', `${this.date} ${this.time}`)

      // prevents animate to date tab when closing
      setTimeout(() => (this.tab = 'date'), 300)
    },
  },
}
</script>
