<script lang="ts">
  export let title: string
  export let value: string
</script>

<div class="flex flex-col">
  <div class="text-sm text-gray-400">{title}</div>
  <div class="text-md">{value ?? '-'}</div>
</div>
