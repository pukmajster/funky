<script lang="ts">
  import classNames from 'classnames'
  import { funkyDrawerStore, type FunkyDrawerType } from './store'
  import { X } from 'lucide-svelte'

  export let id: FunkyDrawerType
  export let label: string

  $: open = $funkyDrawerStore === id

  function close() {
    funkyDrawerStore.set(undefined)
  }
</script>

<div
  class={classNames(
    'FunkyFullscreenMenu flex flex-row z-50  fixed left-0 top-0 bottom-0 h-screen w-screen bg-surface-900/60 text-white transition-[opacity,transform]  will-change-transform',
    {
      'opacity-100 scale-100 pointer-events-auto': open,
      '-translate-x-12 opacity-0 pointer-events-none': !open
    }
  )}
>
  <div
    class="overflow-auto relative z-50 shadow-lg bg-surface-800/90 backdrop-blur-md min-h-screen"
  >
    <div
      class="pointer-events-none absolute top-0 left-0 right-0 min-h-[110px] bg-gradient-to-b from-surface-400/70 to-surface-400/0 opacity-30 -z-10"
    />

    <div
      class=" FunkyFullscreenMenu-Nav grid grid-cols-2 items-center -border-b border-surface-900 p-3"
    >
      <h3 class="text-lg indent-3 uppercase tracking-wider">{label}</h3>

      <button
        on:click={close}
        class="ml-auto btn-icon min-w-[48px] min-h-[48px] hover:bg-surface-600"
      >
        <X />
      </button>
    </div>

    <div class="FunkyFullscreenMenu-Panel pb-3 px-3">
      <slot />
    </div>
  </div>

  <button class="appearance-none flex-1 h-screen cursor-default" on:click={close} />
</div>

<style>
</style>
