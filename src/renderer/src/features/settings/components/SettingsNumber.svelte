<script lang="ts">
  import SettingsPaper from './SettingsPaper.svelte'

  export let value: number
  export let description: string
  export let label: string
</script>

<SettingsPaper {label} {description}>
  <input type="number" bind:value class="input input-bordered input-sm w-auto min-w-[164px]" />
</SettingsPaper>
