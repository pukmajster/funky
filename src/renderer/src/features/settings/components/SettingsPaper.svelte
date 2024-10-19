<script lang="ts">
  export let label: string
</script>

<div class="flex items-center justify-between gap-4 p-3 bg-surface-700 rounded-lg">
  <div>
    <span class="text-base">{label}</span>
    <p class="text-xs opacity-60 mt-1 max-w-[420px]">
      <slot name="description" />
    </p>
  </div>

  <slot name="main" />
</div>
