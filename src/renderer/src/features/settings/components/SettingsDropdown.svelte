<script lang="ts">
  import SettingsPaper from './SettingsPaper.svelte'

  export let value: unknown
  export let description: string
  export let label: string

  export let options: {
    label: string
    value: string
  }[]
</script>

<SettingsPaper {label} {description}>
  <select bind:value class="select !bg-surface-500 indent-2 w-auto min-w-[164px] rounded">
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</SettingsPaper>
