<template>
  <div class="container">
    <b-form>
      <b-form-group label="Test Random String" label-for="input-randomstring">
        <b-form-input
          v-model="text"
          id="input-randomstring"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <div>
        <b-button
          type="button"
          variant="primary"
          @click="generateRandomString()"
          >Generate</b-button
        >
      </div>
    </b-form>
  </div>
</template>

<script>
import randomstring from 'randomstring'

export default {
  data() {
    return {
      text: '',
    }
  },
  methods: {
    generateRandomString() {
      //   console.log(randomstring.generate(8))
      return (this.text = randomstring.generate(8))
    },
  },
}
</script>
