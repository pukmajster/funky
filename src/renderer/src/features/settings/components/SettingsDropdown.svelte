<script lang="ts">
  export let value: unknown

  export let options: {
    label: string
    value: string
  }[]
</script>

<select bind:value class="select !bg-surface-500 indent-2 w-auto min-w-[186px]">
  {#each options as option}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>
