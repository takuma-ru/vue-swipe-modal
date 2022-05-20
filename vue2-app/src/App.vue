<template>
  <div id="app">
    <div class="header">
      <div class="marker" />
      <h1>
        @takuma-ru/vue-swipe-modal [Demo]
      </h1>
    </div>

    <div class="demo">
      <div class="sub-header">
        <div class="marker" />
        <h2>
          Result
        </h2>
      </div>
      <div class="contents">
        <button @click="modal = true">
          <span>
            Open swipe-modal
          </span>
        </button>
      </div>
    </div>

    <div class="inputs">
        <div class="sub-header">
          <div class="marker" />
          <h2>
            Prop Field
          </h2>
        </div>
        <div class="contents">
          <div
            v-for="(prop, index) in propsValue"
            :key="index"
          >
            <div
              v-if="prop.type === 'text'"
              class="input-field"
            >
              <label
                :for="prop.name"
              >
                {{ prop.name }}
              </label>
              <input
                v-model="prop.value"
                type="text"
                :id="prop.name"
              >

            </div>

            <div
              v-if="prop.type === 'checkbox'"
              class="switch "
            >
              <label :for="prop.name" class="label">{{ prop.name }}</label>
              <input
                v-model="prop.value"
                type="checkbox"
                :id="prop.name"
              />
            </div>
          </div>
        </div>
    </div>

    <div class="links">
      <div class="sub-header">
        <div class="marker" />
        <h2>
          Links
        </h2>
      </div>
      <div class="contents">
        links
      </div>
    </div>

    <swipeModal
      v-model="modal"
      :dark="propsValue.dark.value"
      :persistent="propsValue.persistent.value"
      :backgroundC-color="propsValue.backgroundColor.value"
      :fullscreen="propsValue.fullscreen.value"
      :no-tip="propsValue.noTip.value"
      :contents-width="propsValue.contentsWidth.value"
      :contents-height="propsValue.contentsHeight.value"
      :border-top-radius="propsValue.borderTopRadius.value"
      :border-top-left-radius="propsValue.borderTopLeftRadius.value"
      :border-top-right-radius="propsValue.borderTopRightRadius.value"
      :contents-color="propsValue.contentsColor.value"
      :tip-color="propsValue.tipColor.value"
      :dark-contents-color="propsValue.darkContentsColor.value"
    >
      <div style="padding: 24px">
        vue-swipe-modal
        <!-- <div v-for="i in 100" :key="i">
          {{ i }}
        </div> -->
      </div>
    </swipeModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@vue/composition-api';
import swipeModal from '@takuma-ru/vue-swipe-modal/'
/* import swipeModal from '../../node_modules/@takuma-ru/vue-swipe-modal' */

export default defineComponent({
  components: {
    swipeModal,
  },
  setup () {
    const modal = ref<boolean>(false)

    const propsValue = reactive({
      dark: {
        type: 'checkbox',
        value: false,
        name: 'dark'
      },
      persistent: {
        type: 'checkbox',
        value: false,
        name: 'persistent'
      },
      backgroundColor: {
        type: 'text',
        value: '#80808080',
        name: 'background-color'
      },
      fullscreen: {
        type: 'checkbox',
        value: false,
        name: 'fullscreen'
      },
      noTip: {
        type: 'checkbox',
        value: false,
        name: 'no-tip'
      },
      contentsWidth: {
        type: 'text',
        value: '100%',
        name: 'contents-width'
      },
      contentsHeight: {
        type: 'text',
        value: '30vh',
        name: 'contents-height'
      },
      borderTopRadius: {
        type: 'text',
        value: undefined,
        name: 'border-top-radius'
      },
      borderTopLeftRadius: {
        type: 'text',
        value: '0px',
        name: 'border-top-left-radius'
      },
      borderTopRightRadius: {
        type: 'text',
        value: '0px',
        name: 'border-top-right-radius'
      },
      contentsColor: {
        type: 'text',
        value: 'white',
        name: 'contents-color'
      },
      tipColor: {
        type: 'text',
        value: '#c8c8c8',
        name: 'tip-color'
      },
      darkContentsColor: {
        type: 'text',
        value: '#1E1E1E',
        name: 'dark-contetns-color'
      }
    }) as any

    return {
      modal,
      propsValue,
    }
  }
});
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.header {
  display: flex;
  align-items: center;
  .marker {
    position: relative;
    width: 24px;
    height: 38px;
    margin-right: 16px;
    background-color: #FFB2A6;
  }
}
.sub-header {
  display: flex;
  align-items: center;
  .marker {
    position: relative;
    width: 24px;
    height: 28px;
    margin-right: 16px;
    background-color: #FFF89A;
  }
}
.inputs {
  .input-field {
    display: flex;
    flex-direction: column;
    margin: 16px;
    label {
      margin-bottom: 4px;
      font-size: 14px;
      font-weight: bold;
    }
    input {
      padding: 12px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid gray;
    }
  }
  .switch {
    display: flex;
    flex-direction: column;
    margin: 16px;
    label {
      margin-bottom: 4px;
      font-size: 14px;
      font-weight: bold;
    }
    input {
      padding: 12px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid gray;
    }
  }
  .contents {
    margin: 16px 16px 16px 40px;
  }
}
.demo {
  .contents {
    margin: 16px 16px 16px 40px;
    button {
      padding: 12px 24px;
      font-size: 16px;
      border-radius: 8px;
      background-color: #9ADCFF;
      border: none;
      cursor: pointer;
    }
  }
}
.links {
  .contents {
    margin: 16px 16px 16px 40px;
  }
}
</style>