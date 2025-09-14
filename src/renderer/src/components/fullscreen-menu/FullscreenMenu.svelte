<script lang="ts">
  import classNames from 'classnames'
  import { fullscreenMenuStore } from './store'
  import { X } from 'lucide-svelte'

  export let id: FullscreenMenuType
  export let label: string

  $: open = $fullscreenMenuStore === id

  function close() {
    fullscreenMenuStore.set(undefined)
  }
</script>

<div
  class={classNames(
    'FunkyFullscreenMenu overflow-auto fixed inset-0 w-screen p-6 h-screen bg-surface-900/90 backdrop-blur-lg text-white transition-[opacity,transform] ',
    {
      'opacity-100 scale-100 pointer-events-auto': open,
      'scale-[95%] opacity-0 pointer-events-none': !open
    }
  )}
>
  <div class="FunkyFullscreenMenu-Nav max-w-[900px] mx-auto grid grid-cols-3 items-center">
    <div />

    <h3 class="text-3xl text-center">{label}</h3>

    <button
      on:click={close}
      class="ml-auto btn-icon min-w-[64px] min-h-[64px] hover:bg-surface-600"
    >
      <X />
    </button>
  </div>

  <div class="FunkyFullscreenMenu-Panel max-w-[900px] mx-auto mt-12">
    <slot />
  </div>
</div>

<style>
</style>
