<script lang="ts">
  import { SlideToggle } from '@skeletonlabs/skeleton'

  export let label: string
  export let description: string = ''
  export let value: boolean
</script>

<div class="flex items-center justify-between gap-4 p-3 bg-surface-700 rounded-lg">
  <div>
    <span class="text-base">{label}</span>

    {#if description}
      <p class="text-xs opacity-60 mt-1 max-w-[420px]">
        {description}
      </p>
    {/if}
  </div>

  <SlideToggle
    name={label}
    background="bg-surface-500"
    active="bg-primary-500"
    bind:checked={value}
    class="flex items-center gap-2"
  />
</div>
