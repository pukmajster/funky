<script lang="ts">
  import classNames from 'classnames'
  import { fullscreenMenuStore, type FullscreenMenuType } from './store'
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
    'FunkyFullscreenMenu  flex flex-row z-50  fixed left-0 top-0 bottom-0 h-screen w-screen bg-surface-900/60 text-white transition-[opacity,transform]  will-change-transform',
    {
      'opacity-100 scale-100 pointer-events-auto': open,
      '-translate-x-12 opacity-0 pointer-events-none': !open
    }
  )}
>
  <div
    class="overflow-auto z-50 shadow-lg bg-surface-800/90 backdrop-blur-md min-h-screen min-w-[400px] p-3"
  >
    <div class="FunkyFullscreenMenu-Nav grid grid-cols-2 items-center">
      <h3 class="text-xl indent-3 uppercase tracking-wider">{label}</h3>

      <button
        on:click={close}
        class="ml-auto btn-icon min-w-[48px] min-h-[48px] hover:bg-surface-600"
      >
        <X />
      </button>
    </div>

    <div class="FunkyFullscreenMenu-Panel my-4">
      <slot />
    </div>
  </div>

  <button class="appearance-none flex-1 h-screen cursor-default" on:click={close} />
</div>

<style>
</style>
