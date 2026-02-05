<script lang="ts">
  import { AlertTriangle, Check, Dices } from 'lucide-svelte'

  export let isUninstalled: boolean
  export let isShuffled: boolean
  export let isConflicting: boolean
  export let isEnabled: boolean

  const iconStyle = 'w-3'
</script>

<div class="flex gap-2 absolute -bottom-[6px] left-[12px] right-[12px]">
  {#if isUninstalled}
    <div class="status-chip bg-gray-600 border-gray-500">
      <AlertTriangle class={iconStyle} />
      Uninstalled
    </div>
  {:else if isShuffled}
    <div class="status-chip bg-blue-800 border-blue-400">
      <Dices class={iconStyle} />
      Shuffled
    </div>
  {:else if isConflicting}
    <div class="status-chip bg-red-700 border-red-500">
      <AlertTriangle class={iconStyle} />
      Conflicting
    </div>
  {:else if isEnabled}
    <div class="status-chip bg-green-700 border-green-500">
      <Check class={iconStyle} />
      Enabled
    </div>
  {/if}
</div>

<style lang="postcss">
  .status-chip {
    @apply w-full flex shadow-xl border-t rounded-md px-2 gap-[6px] text-[10px] items-center justify-center font-bold uppercase;
  }
</style>
